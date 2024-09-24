import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SettingsPageComponent from '../src/components/SettingsPageComponent';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('SettingsPageComponent', () => {
  it('shows the checkbox as checked when dark mode is enabled', () => {
    render(
      <MemoryRouter>
        <SettingsPageComponent isDarkMode={true} onToggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    // Cast the checkbox to HTMLInputElement
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBeTruthy(); // Check the 'checked' property directly
  });

  it('calls onToggleTheme when the checkbox is toggled', () => {
    const mockOnToggleTheme = vi.fn();
    render(
      <MemoryRouter>
        <SettingsPageComponent isDarkMode={false} onToggleTheme={mockOnToggleTheme} />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBeFalsy(); // Ensure it's not checked initially

    fireEvent.click(checkbox); // Simulate checkbox click

    expect(mockOnToggleTheme).toHaveBeenCalledTimes(1); // Ensure callback was called
  });
});
