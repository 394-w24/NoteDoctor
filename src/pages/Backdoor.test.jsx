import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Backdoor from "./Backdoor"
import { useRealtimeAppointments } from "../utils/firebase";

class MyDate {
    constructor(time_offset) {
        this.time_offset = time_offset;
    }

    // Method definition
    toDate() {
        var currentDate = new Date();
        return new Date(currentDate.getTime() + (this.time_offset * 60 * 1000));
    }
}

const mockData = [
    {
        "pulse": 3,
        "date": new MyDate(5),
        "duration": 45,
        "patient": {
            "pronouns": "she/her",
            "lastName": "Kennedy",
            "age": 58,
            "gender": "Female",
            "firstName": "Charlotte",
            "dob": {
                "seconds": -138308400,
                "nanoseconds": 159000000
            },
            "image": "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/patient3.webp?alt=media&token=26e7ff5d-98b9-48fb-8d5f-3d68d290f4d9"
        },
        "room": null,
        "status": "checkedIn",
        "weight": 135,
        "bp": "120/60",
        "type": "Annual Exam",
        "details": [
            "Breast Exam",
            "Pelvic Exam",
            "Pap smear & STD testing"
        ],
        "issues": [],
        "height": "5'6\"",
        "respRate": 3,
        "id": "D5NkmeVyH8v9soWuaqXo"
    },
    {
        "weight": 176,
        "room": null,
        "duration": 45,
        "issues": [],
        "bp": "140/80",
        "status": "ArrivedAndWaiting",
        "respRate": 20,
        "height": "5'2\"",
        "patient": {
            "dob": {
                "seconds": 547794000,
                "nanoseconds": 159000000
            },
            "firstName": "Sofia",
            "lastName": "Marquez",
            "gender": "Female",
            "image": "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/patient2.webp?alt=media&token=a11cbf75-ffcb-46e2-a4c6-8ffdb165e04c",
            "pronouns": "she/her",
            "age": 28
        },
        "details": [
            "Breast Exam",
            "Pelvic Exam",
            "Pap smear & STD testing"
        ],
        "pulse": 65,
        "date": new MyDate(5),
        "type": "Annual Exam",
        "id": "MGFC7ecAIWzrabZKvQJ5"
    },
    {
        "weight": 120,
        "details": [
            "Breast Exam",
            "Pelvic Exam",
            "Pap smear & STD testing"
        ],
        "bp": "110/65",
        "respRate": 16,
        "room": null,
        "patient": {
            "firstName": "Carly",
            "age": 28,
            "gender": "Female",
            "lastName": "Lowell",
            "dob": {
                "seconds": 801982800,
                "nanoseconds": 159000000
            },
            "image": "https://firebasestorage.googleapis.com/v0/b/notedoctor-d96e7.appspot.com/o/patient.webp?alt=media&token=657468d6-ee97-434b-825c-7a7d994e3d42",
            "pronouns": "she/her"
        },
        "height": "5'6\"",
        "status": "checkedOut",
        "type": "Annual Exam",
        "date": new MyDate(5),
        "duration": 40,
        "issues": [],
        "pulse": 65,
        "id": "KMa3tIVTBbLKpv9etNau"
    }
]
vi.mock('../utils/firebase');

describe('Backdoor Tests', () => {
    test("Checked* appts should be displayed", () => {
        useRealtimeAppointments.mockReturnValue(mockData);
        render(<Backdoor />)
        expect(screen.getByText('Reset Appointments')).toBeDefined();
        expect(screen.getByText('Carly Lowell')).toBeDefined();
        expect(screen.getByText('Charlotte Kennedy')).toBeDefined();
        expect(screen.queryByText('Sofia Marquez')).toBeNull();
    });
    test("Past appts should be displayed", () => {
        mockData[0].date = new MyDate(-1);
        mockData[1].date = new MyDate(-1);
        mockData[2].status = "ArrivedAndWaiting";
        useRealtimeAppointments.mockReturnValue(mockData);
        render(<Backdoor />)
        expect(screen.getByText('Reset Appointments')).toBeDefined();
        expect(screen.getByText('Sofia Marquez')).toBeDefined();
        expect(screen.getByText('Charlotte Kennedy')).toBeDefined(); 
        expect(screen.queryByText('Carly Lowell')).toBeNull(); 
    });
});


