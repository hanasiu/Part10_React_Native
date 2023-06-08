import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const mockSignProcess = jest.fn(); // Create a mock function
  
        render(<SignInContainer SignProcess={mockSignProcess} />);
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'testpassword');
  
        // Press the submit button
        const submitButton = screen.getByText('Submit');
        fireEvent.press(submitButton);
  
        await waitFor(() => {
          // Expect the mockSignProcess function to have been called once
          expect(mockSignProcess).toHaveBeenCalledTimes(1);
          // Expect the mockSignProcess function to have been called with the correct arguments
          expect(mockSignProcess).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
          });
        });
      });
    });
  });