import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoomScreen from './RoomScreen';
import * as firebaseUtils from '../utils/firebase';

// Mock useRealtimeRoom hook
vi.mock('../utils/firebase', () => ({
  useRealtimeRoom: vi.fn()
}));

describe('RoomScreen Component Tests', () => {
  test('displays loading state', async () => {
    // Mock useRealtimeRoom to return undefined to simulate loading state
    firebaseUtils.useRealtimeRoom.mockReturnValue(undefined);

    render(
      <MemoryRouter initialEntries={['/room/testRoomId']}>
        <Routes>
          <Route path="/room/:roomId" element={<RoomScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeDefined();
  });

  test('displays the room when room data is present without an appointment', async () => {
    // Mock useRealtimeRoom to return room data
    firebaseUtils.useRealtimeRoom.mockReturnValue({ name: 'Test Room', id: 'testRoomId' });

    render(
      <MemoryRouter initialEntries={['/room/testRoomId']}>
        <Routes>
          <Route path="/room/:roomId" element={<RoomScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Room Test Room')).toBeDefined();
    expect(screen.getByText('Code: testRoomId')).toBeDefined();
  });
});
