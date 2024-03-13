import { describe, expect, test, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckIn from "./CheckIn";

const mockApptData = {
  weight: 120,
  details: ["Breast Exam", "Pelvic Exam", "Pap smear & STD testing"],
  bp: "110/65",
  respRate: 16,
  room: null,
  patient: {
    firstName: "Carly",
    age: 28,
    gender: "Female",
    lastName: "Lowell",
    dob: {
      toDate: () => new Date("1990-01-01"), // Adjust the date as needed
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/patient.webp?alt=media&token=657468d6-ee97-434b-825c-7a7d994e3d42",
    pronouns: "she/her",
  },
  height: "5'6\"",
  status: "checkedOut",
  type: "Annual Exam",
  date: null,
  duration: 40,
  issues: [],
  pulse: 65,
  id: "1",
};

vi.mock("react-query", async () => {
  const originalModule = await vi.importActual("react-query"); // Import the actual react-query module
  return {
    ...originalModule, // Spread all exports from the original module
    useQuery: vi.fn(() => ({
      data: mockApptData,
    })),
  };
});

describe("FormInput in CheckIn Page", () => {
  test.each([
    // For height validation
    ["Height", "5'10''", /Please use the right height format. eg. 5'10"/],
    // For height validation
    ["Weight", "error", /Please make sure input the right weight. eg. a positive number/],
    // For height validation
    ["Respiration Rate", "15.22", /Please make sure input the right respiration rate. eg. a positive integer/],
    // For height validation
    ["Pulse", "error", /Please make sure input the right pulse. eg. a positive integer/],
    // For height validation
    ["Blood Pressure", "120/1000", /Please use the right blood pressure format. eg. 120\/60/],
  ])("InputForm input validation check", async (placeholder, input, expected) => {
    // Wrap CheckIn component with both QueryClientProvider and MemoryRouter
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CheckIn />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // Find form inputs by their unique ids
    const heightInput = screen.getByPlaceholderText(placeholder);

    // Simulate user input
    fireEvent.input(heightInput, { target: { value: input } });

    // Assert the changes
    expect(screen.getByText(expected));
  });
});
