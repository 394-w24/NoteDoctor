import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PatientPrivate from '../components/PatientPrivate';
import * as firebaseUtils from '../utils/firebase';

describe('PatientPrivate component', () => {
  it('prompts user to enter date of birth', async () => {

    // Mock room data
    const room = {
      id: 'sampleRoomId',
      appointment: {
        patient: {
          firstName: 'Jane',
          lastName: 'Doe',
          dob: {
            toDate: () => new Date('1990-01-01'),
          },
        },
      },
    };

    // Render the component
    const { getByText } = render(<PatientPrivate room={room} />);

    // Check if the greeting message is displayed
    expect(getByText(`Hello, ${room.appointment.patient.firstName} ${room.appointment.patient.lastName}`)).toBeDefined();

    // Check if the prompt is displayed
    expect(getByText('Please confirm your Date of Birth:')).toBeDefined();

    // Confirm button should be present
    const confirmButton = getByText('Confirm');
    expect(confirmButton).toBeDefined();

    // Trigger confirmation
    fireEvent.click(confirmButton);
  });
});
