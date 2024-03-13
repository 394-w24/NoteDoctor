import { render, screen } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import * as firebaseUtils from "../utils/firebase";
import RoomScreen from "./RoomScreen";

// Mock useRealtimeRoom hook
vi.mock("../utils/firebase", () => ({
  useRealtimeRoom: vi.fn(),
  getWaitTime: vi.fn(),
}));

describe("RoomScreen Component Tests", () => {
  test("displays loading state", async () => {
    // Mock useRealtimeRoom to return undefined to simulate loading state
    firebaseUtils.useRealtimeRoom.mockReturnValue(undefined);

    render(
      <MemoryRouter initialEntries={["/room/testRoomId"]}>
        <Routes>
          <Route path="/room/:roomId" element={<RoomScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("displays the room when room data is present without an appointment", async () => {
    // Mock useRealtimeRoom to return room data
    firebaseUtils.useRealtimeRoom.mockReturnValue({
      name: "Test Room",
      id: "testRoomId",
    });

    render(
      <MemoryRouter initialEntries={["/room/testRoomId"]}>
        <Routes>
          <Route path="/room/:roomId" element={<RoomScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Room Test Room")).toBeDefined();
    expect(screen.getByText("Code: testRoomId")).toBeDefined();
  });

  test("Patient screen renders from data when confirmed", async () => {
    // Mock useRealtimeRoom to return room data
    firebaseUtils.useRealtimeRoom.mockReturnValue({
      name: "Test Room",
      id: "testRoomId",
      confirmed: true,
      appointment: {
        caregivers: [
          {
            bio: "This is a bio",
            firstName: "Maria",
            id: "1",
            image:
              "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/nurse.webp?alt=media&token=ae23d417-92d2-4151-9cf4-1783ea34d4ea",
            lastName: "Tester",
            role: "nurse",
            suffix: "RN",
          },
          {
            bio: "This is another bio",
            firstName: "Tester",
            id: "2",
            image:
              "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/nurse.webp?alt=media&token=ae23d417-92d2-4151-9cf4-1783ea34d4ea",
            lastName: "Alverez",
            role: "doctor",
            suffix: "MD",
          },
        ],
        patient: {
          firstName: "Sofia",
          gender: "Female",
          dob: new Timestamp(1620000000, 0),
          image:
            "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/patient2.webp?alt=media&token=a11cbf75-ffcb-46e2-a4c6-8ffdb165e04c",
          lastName: "Marquez",
          pronouns: "she/her",
        },
        details: [],
        issues: [],
        status: "checkedIn",
        date: new Timestamp(1620000000, 0),
        uuid: "testAppointmentId",
        duration: 45,
        height: "3'4\"",
        pulse: 34,
        respRate: 23,
        type: "Annual Exam",
        weight: 120,
      },
    });
    firebaseUtils.getWaitTime.mockReturnValue(new Date());

    render(
      <MemoryRouter initialEntries={["/room/testRoomId"]}>
        <Routes>
          <Route path="/room/:roomId" element={<RoomScreen />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Annual Exam")).toBeDefined();
    expect(screen.getByText("45 Minutes")).toBeDefined();
    expect(screen.getByText("Maria Tester")).toBeDefined();
    expect(screen.getByText("Tester Alverez")).toBeDefined();
    expect(screen.getByText("Hello, Sofia Marquez")).toBeDefined();
  });
  test("Patient Screen uses Expected Wait time", async () => {
    // Mock useRealtimeRoom to return room data
    firebaseUtils.useRealtimeRoom.mockReturnValue({
      name: "Test Room",
      id: "testRoomId",
      confirmed: true,
      appointment: {
        caregivers: [
          {
            bio: "This is a bio",
            firstName: "Maria",
            id: "1",
            image:
              "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/nurse.webp?alt=media&token=ae23d417-92d2-4151-9cf4-1783ea34d4ea",
            lastName: "Tester",
            role: "nurse",
            suffix: "RN",
          },
          {
            bio: "This is another bio",
            firstName: "Tester",
            id: "2",
            image:
              "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/nurse.webp?alt=media&token=ae23d417-92d2-4151-9cf4-1783ea34d4ea",
            lastName: "Alverez",
            role: "doctor",
            suffix: "MD",
          },
        ],
        patient: {
          firstName: "Sofia",
          gender: "Female",
          dob: new Timestamp(1620000000, 0),
          image:
            "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/patient2.webp?alt=media&token=a11cbf75-ffcb-46e2-a4c6-8ffdb165e04c",
          lastName: "Marquez",
          pronouns: "she/her",
        },
        details: [],
        issues: [],
        status: "checkedIn",
        date: new Timestamp(1620000000, 0),
        uuid: "testAppointmentId",
        duration: 45,
        height: "3'4\"",
        pulse: 34,
        respRate: 23,
        type: "Annual Exam",
        weight: 120,
      },
    });
    firebaseUtils.getWaitTime.mockReturnValue(new Date());

    render(
      <MemoryRouter initialEntries={["/room/testRoomId"]}>
        <Routes>
          <Route path="/room/:roomId" element={<RoomScreen />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Expected Wait Time:")).toBeDefined();
    expect(screen.getByText("The doctor will see you shortly")).toBeDefined();
  });
});
