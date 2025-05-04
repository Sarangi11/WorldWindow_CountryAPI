// src/__tests__/Navbar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';

describe('Navbar theme toggle', () => {
  it('toggles dark mode on and off', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole('button', {
      name: /dark mode|light mode/i,
    });

    // initial click → dark mode should be enabled
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // second click → back to light
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
