import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoomScreen from '../pages/RoomScreen';
import * as firebaseUtils from '../utils/firebase';

// Mock useRealtimeRoom hook
vi.mock('../utils/firebase', () => ({
    useRealtimeRoom: vi.fn(),
    getWaitTime: vi.fn()
  }));

const mockData = { 
        id: '221',
        name: '221',
        confirmed: true,
        display: null,
        appointment: {
            date: new Date(),
            issues: ['issue1', 'issue2'],
            bp: '120/80',
            caregivers: [
                {
                    bio: 'bio',
                    firstName: 'Maria',
                    lastName: 'Alvarez',
                    image: 'image',
                    role: 'doctor',
                    suffix: 'RN'
                }],
            details: ['detail1', 'detail2'],
            duration: 30,
            height: '5\'8"',
            patient: {
                age: 30,
                dob: {
                    toDate() {
                      return new Date();
                    },
                },
                firstName: 'Carly',
                gender: 'female',
                image: 'image',
                lastName: 'Lowell',
                pronouns: 'she/her'
            },
            pulse: 60,
            respRate: 12,
            room: '221',
            status: 'checkedIn',
            type: 'Annual Exam',
            weight: 125
        }
};



const roomRenderer = (roomId) => { 
    return (
        <MemoryRouter initialEntries={[`/room/${roomId}`]}>
            <Routes>
            <Route path="/room/:roomId" element={<RoomScreen />} />
            </Routes>
        </MemoryRouter>
    )
};

describe('RoomScreen Component Tests', () => {
  test('checks that additional issues are present', async () => {

    // Mock useRealtimeRoom to return undefined to simulate loading state
    firebaseUtils.useRealtimeRoom.mockReturnValue(mockData);
    

    render(roomRenderer('221'));
    // Log the container HTML
    //screen.debug();

    //const patientWelcome = await screen.findAllByTestId('patient-welcome');

    //console.log("patient welcome is", patientWelcome);

    //const patientWelcome = screen.queryAllByTestId('room');

    //console.log("patient welcome is", patientWelcome[0]);

    //expect(patientWelcome.length).toBeGreaterThan(0);

    // check that additional issues array is non-empty
    const additionalIssues = screen.queryAllByTestId('additional-issues');
    expect(additionalIssues.length).toBeGreaterThan(0);
    
  });

});
