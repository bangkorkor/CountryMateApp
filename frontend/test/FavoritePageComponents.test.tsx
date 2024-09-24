import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { QueryClient, QueryClientProvider, QueryObserverSuccessResult, useQuery } from '@tanstack/react-query';
import FavoritePageComponent from '../src/components/FavoritePageComponent';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as API from '../src/api/API'; 

describe('FavoritePageComponent', () => {
    const queryClient = new QueryClient(); // Create a new QueryClient instance
  
    beforeEach(() => {
      // Set up localStorage with some favorite countries
      localStorage.setItem('favoriteCountries', JSON.stringify(['Norway', 'Sweden']));
  
      // Mock the API call for fetchFavoriteCountries
      vi.spyOn(API, 'fetchFavoriteCountries').mockResolvedValue([
        {
          name: { common: 'Norway' },
          flags: { png: 'norway-flag.png' },
          population: 5000000,
          area: 148729,
          capital: ['Oslo'],
        },
        {
          name: { common: 'Sweden' },
          flags: { png: 'sweden-flag.png' },
          population: 10300000,
          area: 450295,
          capital: ['Stockholm'],
        },
      ]);
    });
  
    afterEach(() => {
      vi.restoreAllMocks(); // Clean up mocks after each test
    });
  
    it('loads favorite countries from localStorage', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <FavoritePageComponent />
          </MemoryRouter>
        </QueryClientProvider>
      );
  
      // Wait for the content to appear since it involves async behavior
      const norway = await screen.findByText('Norway');
      const sweden = await screen.findByText('Sweden');
  
      // Ensure both "Norway" and "Sweden" are displayed
      expect(norway).toBeTruthy();
      expect(sweden).toBeTruthy();
    });
  });