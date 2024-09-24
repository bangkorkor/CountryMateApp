import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest'; // Import vitest's vi to mock
import ContinentComponent from '../src/components/ContinentComponent';
import React from 'react';


vi.mock('react-router-dom', () => ({
  ...require('react-router-dom'), // Import the original module except `useNavigate`
  useNavigate: vi.fn(), // Mock useNavigate only
}));

describe('ContinentComponent', () => {
  it('renders continent name and picture correctly', () => {
    render(
      <MemoryRouter>
        <ContinentComponent continentName="Europe" continentPicture="/europe.jpg" />
      </MemoryRouter>
    );

    // Check if the continent name is rendered
    const continentName = screen.getByText('Europe');
    expect(continentName).toBeTruthy(); // Check if the text "Europe" exists

    // Check if the image with alt text "Continent" exists
    const continentImage = screen.getByAltText('Continent');
    expect(continentImage).toBeTruthy(); // Ensure the image is rendered

    expect(continentImage.outerHTML).toContain('src="/europe.jpg"');
  });

  it('navigates to the correct continent route on click', () => {
    const mockNavigate = vi.fn(); // Create a mock function for navigation
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ContinentComponent continentName="Asia" continentPicture="/asia.jpg" />
      </MemoryRouter>
    );

    // Simulate a click event on the continent card
    const continentCard = screen.getByText('Asia');
    fireEvent.click(continentCard);

    // Check if the navigate function was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/continents/Asia');
  });
});
