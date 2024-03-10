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

  test('should render free and occupied rooms correctly', () => {
    render(<RoomSelect />, { wrapper: MemoryRouter });

    // Chai's assertions for checking elements' presence
    expect(screen.queryByText('Room A')).to.not.be.null;
    expect(screen.queryByText('Room B')).to.not.be.null;
    expect(screen.queryByText('Room C')).to.not.be.null;

    // Check for the number of free and occupied statuses
    const freeStatuses = screen.queryAllByText('Free');
    const occupiedStatuses = screen.queryAllByText('Occupied');
    expect(freeStatuses).to.have.lengthOf(2); // Expecting two free rooms
    expect(occupiedStatuses).to.have.lengthOf(1); // Expecting one occupied room
  });

    test('should display a loading message when fetching data', () => {
        useRealTimeCollection.mockReturnValue(null);

        render(<RoomSelect />, { wrapper: MemoryRouter });

        // Check if the loading message is displayed
        const loadingMessage = screen.queryByText('Loading...');
        expect(loadingMessage).to.not.be.null;
    });

    test('should display a message when no rooms are available', () => {
        useRealTimeCollection.mockReturnValue([]);

        render(<RoomSelect />, { wrapper: MemoryRouter });

        // Check if the no rooms message is displayed
        const noRoomsMessage = screen.queryByText('No rooms available');
        expect(noRoomsMessage).to.not.be.null;
    });

    test('should display a message when no free rooms are available', () => {
        useRealTimeCollection.mockReturnValue([{ name: 'Room A', appointment: {} }]);

        render(<RoomSelect />, { wrapper: MemoryRouter });

        // Check if the no free rooms message is displayed
        const noFreeRoomsMessage = screen.queryByText('No free rooms available');
        expect(noFreeRoomsMessage).to.not.be.null;
    });

    test('should display a message when no occupied rooms are available', () => {
        useRealTimeCollection.mockReturnValue([{ name: 'Room A', appointment: null }]);

        render(<RoomSelect />, { wrapper: MemoryRouter });

        // Check if the no occupied rooms message is displayed
        const noOccupiedRoomsMessage = screen.queryByText('No occupied rooms available');
        expect(noOccupiedRoomsMessage).to.not.be.null;
    });

});
