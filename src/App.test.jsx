import { BrowserRouter as Router} from "react-router-dom";
import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
// import RoomCode from "/pages/RoomScreen";

describe('counter tests', () => {
    
  test("Room screen should be displayed", () => {
    render(
      <Router>
      <App />
      </Router>
      );
    expect(screen.getByText('What room is this?')).toBeDefined();
  });

});