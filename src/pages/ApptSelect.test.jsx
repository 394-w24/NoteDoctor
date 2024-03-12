import { ddescribe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ApptSelect from "./ApptSelect";
import { useRealtimeAppointments } from "../utils/firebase";
import { BrowserRouter } from 'react-router-dom'




vi.mock('../utils/firebase', {
});
const mockDate = new Date(2022, 0, 1);


vi.setSystemTime(mockDate);


const now = new Date();
vi.mock('../utils/firebase');




const mockData = [
    {
        "id": 1,
        "status": "cancelled",
        "patient": {
          "firstName": "Sofia",
          "lastName": "Marquez"
        },

        "date": { toDate: () => new Date() }
      },
      {
        "id": 2,
        "status": "checkedIn",
        "patient": {
          "firstName": "Charlotte",
          "lastName": "Kennedy"
        },

        "date": { toDate: () => new Date() }
      },
      {
        "id": 3,
        "status": "checkedOut",
        "patient": {
          "firstName": "Carly ",
          "lastName": "Lowell"
        },

        "date": { toDate: () => new Date() }
      },
      {
        "id": 4,
        //"status": "scheduled",
        "patient": {
          "firstName": "Amy",
          "lastName": "Lowell"
        },

        "date": { toDate: () => new Date() }
      }
      
    ]



    describe('ApptSelect components test', () => {
        test('Appt Selector renders all appointment components', () => {
        useRealtimeAppointments.mockReturnValue(mockData);
        render(
            <BrowserRouter>
            <ApptSelect />
            </BrowserRouter>,
        );

        expect(screen.getByText("Sofia Marquez")).toBeDefined();
        expect(screen.getByText("Charlotte Kennedy")).toBeDefined();
        expect(screen.getByText("Carly Lowell")).toBeDefined();
        expect(screen.getByText("Amy Lowell")).toBeDefined();
        expect(screen.getByText("Cancelled")).toBeDefined();
        expect(screen.getByText("Checked in")).toBeDefined();
        expect(screen.getByText("Checked out")).toBeDefined();
        expect(screen.getByText("Check In")).toBeDefined();
        expect(screen.getByText("Arrived and waiting")).toBeDefined();
        expect(screen.getByText("Appointments")).toBeDefined();
        expect(now.valueOf()).toBe(mockDate.valueOf());
        vi.useRealTimers();
        });
      
        test('Check In button changes to View Check In after clicking', () => {

            render(
              <BrowserRouter>
                <ApptSelect />
              </BrowserRouter>,
            );
        
            expect(screen.getByText("Check In")).toBeDefined();
        
            fireEvent.click(screen.getByText("Check In"));

            expect(screen.getByText("View Check In")).toBeDefined();
          });
        
      });
      