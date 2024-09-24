// api.ts
export const fetchCountriesByContinent = async (continent: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/all?fields=name,flags,continents,population,area,capital`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await response.json();

  // Filter countries by continent
  return data.filter((country: any) => country.continents.includes(continent));
};

export const fetchFavoriteCountries = async (favorites: string[]) => {
  const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,area,capital`);

  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await response.json();

  // Filter countries by continent
  return data.filter((country: any) => favorites.includes(country.name.common));
};
