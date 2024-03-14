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

const mockPublicRoomData = { 
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

const mockPrivateRoomData = { 
    id: '221',
    name: '221',
    confirmed: false,
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
  test('displays public rooms and not private rooms', async () => {

    // Mock useRealtimeRoom to return undefined to simulate loading state
    firebaseUtils.useRealtimeRoom.mockReturnValue(mockPublicRoomData);
    

    render(roomRenderer('221'));

    //screen.debug();

    // Check that the public room is displayed
    const publicRoom = screen.queryAllByTestId('patient-welcome');
    // console.log("public room is", publicRoom);
    // console.log("type of public room is", typeof publicRoom);
    // console.log("length of public room is", publicRoom.length);
    expect(publicRoom.length).toBeGreaterThan(0);

    // check that private room is not displayed
    const privateRoom = screen.queryAllByTestId('patient-private');
    expect(privateRoom.length).toBe(0);
  });


    test('displays private rooms and not private rooms', async () => {
        // Mock useRealtimeRoom to return private room data
    firebaseUtils.useRealtimeRoom.mockReturnValue(mockPrivateRoomData);

    render(roomRenderer('221'));

    // Check that the private room is displayed
    const privateRoom2 = screen.queryAllByTestId('patient-private');
    expect(privateRoom2.length).toBeGreaterThan(0);

    screen.debug();

    // check that public room is not displayed
    const publicRoom2 = screen.queryAllByTestId('patient-welcome');
    expect(publicRoom2.length).toBe(0);


    });

    

});
