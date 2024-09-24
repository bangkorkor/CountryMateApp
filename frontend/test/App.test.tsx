import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../src/App'; 
import { MemoryRouter } from 'react-router-dom';

// Mock localStorage
beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'theme') return 'light';
    if (key === 'currentRoute') return '/';
    return null;
  });

  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

describe('App Component', () => {
  it('sets current route to localStorage when navigating', () => {
    // Render the App
    render(<App />);

    // Simulate a route change to /favorites
    window.history.pushState({}, 'Favorites page', '/favorites');

    // Trigger the window's popstate event to ensure the router knows about the route change
    fireEvent.popState(window);

    // Now check if localStorage.setItem was called with the expected arguments
    expect(localStorage.setItem).toHaveBeenCalledWith('currentRoute', '/favorites');
  });
});

  
  it('sets current route to localStorage when navigating', () => {
    render(<App />);
  
    // Simulate a route change to /favorites
    window.history.pushState({}, 'Favorites page', '/favorites');
    fireEvent.popState(window);
  
    // Now check if localStorage.setItem was called with the expected arguments
    expect(localStorage.setItem).toHaveBeenCalledWith('currentRoute', '/favorites');
  });
  

  
  
  
  
  
  
  
  
