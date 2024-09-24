import React, { useState } from 'react';
import './css/CountryListComponent.css';
import CountryCardComponent from './CountryCardComponent';
import FavoriteButtonComponent from './FavoriteButtonComponent';

export interface Country {
  name: string;
  flag: string;
  capital: string;
  population: number;
  area: number;
}

export interface CountriesProps {
  items: Country[];
}

const CountryListComponent: React.FC<CountriesProps> = ({ items }) => {
  const [countryState, setCountryState] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const toggleCountry = (country?: Country) => {
    setCountryState((prevState) => !prevState);
    if (country) {
      setSelectedCountry(country);
    }
  };

  return (
    <>
      {countryState && selectedCountry && (
        <CountryCardComponent
          closeCard={() => {
            toggleCountry();
          }}
          name={selectedCountry.name}
          flag={selectedCountry.flag}
          population={selectedCountry.population}
          area={selectedCountry.area}
          capital={selectedCountry.capital}
        ></CountryCardComponent>
      )}
      <ul className="fullList">
        {items.map(
          (item, index) => (
            (
              <li key={index} className="listItem" onClick={() => toggleCountry(item)}>
                <FavoriteButtonComponent countryName={item.name}></FavoriteButtonComponent>
                <h3 className="countryHeader">{item.name}</h3>
                <img src={item.flag} style={{ width: '100px' }} />
              </li>
            )
          ),
        )}
      </ul>
    </>
  );
};
export default CountryListComponent;
