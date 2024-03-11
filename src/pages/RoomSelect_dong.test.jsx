import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoomSelect from './RoomSelect';
import { useRealTimeCollection } from "../utils/firebase";

// Mock the useRealTimeCollection hook
vi.mock('../utils/firebase', () => ({
  useRealTimeCollection: vi.fn()
}));

const mockRoomsData = [
  { name: 'Room A', appointment: null }, // Free room
  { name: 'Room B', appointment: {} }, // Occupied room
  { name: 'Room C', appointment: null } // Another free room
];

describe('RoomSelect Component Tests', () => {
  beforeEach(() => {
    useRealTimeCollection.mockReturnValue(mockRoomsData);
  });

    test('should display a message when no occupied rooms are available', () => {
        useRealTimeCollection.mockReturnValue([{ name: 'Room A', appointment: null }]);

        render(<RoomSelect />, { wrapper: MemoryRouter });

        // Check if the no occupied rooms message is displayed
        const noOccupiedRoomsMessage = screen.queryByText('No occupied rooms available');
        expect(noOccupiedRoomsMessage).to.not.be.null;
    });

    test('Room Selector changes when status changes in firebase', async () => {
        // Initially mock the Firebase hook to return a set of rooms
        useRealTimeCollection.mockReturnValue([
          { name: 'Room A', appointment: null }, // Initially free
          { name: 'Room B', appointment: {} }, // Initially occupied
        ]);
      
        // Render the RoomSelect component
        render(<RoomSelect />, { wrapper: MemoryRouter });
      
        // Verify initial state (1 free, 1 occupied)
        expect(screen.queryByText('Room A')).to.not.be.null;
        expect(screen.queryAllByText('Free').length).to.equal(1);
        expect(screen.queryByText('Room B')).to.not.be.null;
        expect(screen.queryAllByText('Occupied').length).to.equal(1);
      
        // Change the mock to simulate a status change in Firebase
        useRealTimeCollection.mockReturnValue([
          { name: 'Room A', appointment: {} }, // Now occupied
          { name: 'Room B', appointment: null }, // Now free
        ]);

        render(<RoomSelect />, { wrapper: MemoryRouter });      
    });
  

});
