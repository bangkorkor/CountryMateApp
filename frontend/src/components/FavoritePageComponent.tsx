import { Country } from './CountryListComponent';
import NavbarComponent from './NavbarComponent';
import './css/FavoritePageComponent.css';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteCountries } from '../api/API';
import CountryListComponent from './CountryListComponent';
import LoadingScreen from './LoadingScreenComponent';
import React from 'react';

const FavoritePageComponent: React.FC = () => {
  const favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
  console.log(favoriteCountries);

  const { data, isLoading, error } = useQuery({
    queryKey: ['favoriteCountries', favoriteCountries],
    queryFn: () => fetchFavoriteCountries(favoriteCountries),
    enabled: favoriteCountries.length > 0, // Ensures the query runs only when there are favorites
  });

  if (isLoading) {return <LoadingScreen />;}
  if (error) return <p>Error fetching countries: {error.message}</p>;

  const countries: Country[] =
    data?.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.png,
      population: country.population,
      area: country.area,
      capital: country.capital?.[0],
    })) || [];

  return (
    <div className="mainbox">
      <NavbarComponent></NavbarComponent>
      <div className="favoritepagecontent">
        <h1 className="placeholder">Your favorites</h1>
        <CountryListComponent items={countries}></CountryListComponent>
      </div>
    </div>
  );
};

export default FavoritePageComponent;
