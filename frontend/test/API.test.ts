import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fetchCountriesByContinent, fetchFavoriteCountries } from '../src/api/API';

// Mock the global fetch function
global.fetch = vi.fn(); // Use vi.fn() for mocking

describe('API Functions', () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Clean up mocks after each test
  });

  describe('fetchCountriesByContinent', () => {
    it('fetches countries filtered by continent', async () => {
      // Mock the response for fetch
      const mockCountries = [
        { name: { common: 'Norway' }, continents: ['Europe'], flags: { png: 'norway-flag.png' } },
        { name: { common: 'Brazil' }, continents: ['South America'], flags: { png: 'brazil-flag.png' } },
      ];

      // Use vi.mockResolvedValueOnce for Vitest
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCountries,
      });

      const result = await fetchCountriesByContinent('Europe');

      expect(result).toEqual([mockCountries[0]]); // Expect only European countries to be returned
      expect(global.fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all?fields=name,flags,continents,population,area,capital');
    });

    it('throws an error if the API request fails', async () => {
      // Use vi.mockResolvedValueOnce for Vitest
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchCountriesByContinent('Europe')).rejects.toThrow('Failed to fetch countries');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchFavoriteCountries', () => {
    it('fetches favorite countries', async () => {
      const mockCountries = [
        { name: { common: 'Norway' }, flags: { png: 'norway-flag.png' } },
        { name: { common: 'Brazil' }, flags: { png: 'brazil-flag.png' } },
      ];

      // Use vi.mockResolvedValueOnce for Vitest
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCountries,
      });

      const result = await fetchFavoriteCountries(['Norway']);

      expect(result).toEqual([mockCountries[0]]); // Expect only favorite countries to be returned
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all?fields=name,flags,population,area,capital');
    });

    it('throws an error if the API request fails', async () => {
      // Use vi.mockResolvedValueOnce for Vitest
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchFavoriteCountries(['Norway'])).rejects.toThrow('Failed to fetch countries');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
