import { useEffect, useState } from 'react';
import CountryListComponent, { Country } from './CountryListComponent';
import NavbarComponent from './NavbarComponent';
import './css/CountriesPageComponent.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCountriesByContinent } from '../api/API';
import LoadingScreen from './LoadingScreenComponent';

const CountriesPageComponent: React.FC = () => {
  const { continent } = useParams<{ continent: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['countries', continent],
    queryFn: () => fetchCountriesByContinent(continent!),
    enabled: !!continent,
  });

  const [sortOption, setSortOption] = useState(() => sessionStorage.getItem('sortOption') || 'alphabet');
  const [isAscending, setIsAscending] = useState(() => sessionStorage.getItem('isAscending') === 'true');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState(false);

  // Load filter state and population range from sessionStorage
  const [filter, setFilter] = useState(() => sessionStorage.getItem('filterApplied') === 'true');
  const [minPopulation, setMinPopulation] = useState(() => parseInt(sessionStorage.getItem('minPopulation') || '0'));
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(() => {
    const storedCountries = sessionStorage.getItem('filteredCountries');
    return storedCountries ? JSON.parse(storedCountries) : [];
  });

  // Watch for continent changes
  useEffect(() => {
    const storedContinent = sessionStorage.getItem('continent');

    // If the continent has changed, reset filters
    if (storedContinent !== continent) {
      sessionStorage.removeItem('filteredCountries');
      sessionStorage.removeItem('minPopulation');
      sessionStorage.setItem('continent', continent || '');
      setFilteredCountries([]); // Reset filtered countries
      setMinPopulation(0); // Reset population filter
      setFilter(false); // Reset filter

      // Reset sorting options
      sessionStorage.removeItem('sortOption');
      sessionStorage.removeItem('isAscending');
      setSortOption('alphabet'); // Reset sort option to default or desired value
      setIsAscending(true); // Reset sorting direction to default
    } else {
      // Load filtered countries from sessionStorage if available
      const storedFilteredCountries = sessionStorage.getItem('filteredCountries');
      if (storedFilteredCountries) {
        setFilteredCountries(JSON.parse(storedFilteredCountries));
      }
    }
  }, [continent]);

  // Save sorting, filtering, and population in sessionStorage when changed
  useEffect(() => {
    sessionStorage.setItem('sortOption', sortOption);
    sessionStorage.setItem('isAscending', isAscending.toString());
    sessionStorage.setItem('minPopulation', minPopulation.toString());
    sessionStorage.setItem('filteredCountries', JSON.stringify(filteredCountries));
    sessionStorage.setItem('filterApplied', filter.toString());
  }, [sortOption, isAscending, minPopulation, filteredCountries, filter]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) return <p>Error fetching countries: {error.message}</p>;

  const countries: Country[] =
    data?.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.png,
      population: country.population,
      area: country.area,
      capital: country.capital?.[0], // Capital is an array, so we take the first element
    })) || [];

  const applySorting = (countriesToSort: Country[]) => {
    return countriesToSort.sort((a: Country, b: Country) => {
      if (sortOption === 'alphabet') {
        return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortOption === 'population') {
        return isAscending ? a.population - b.population : b.population - a.population;
      } else if (sortOption === 'area') {
        return isAscending ? a.area - b.area : b.area - a.area;
      }
      return 0;
    });
  };

  const filterByPopulation = (minPopulation: number) => {
    const filteredData = countries.filter((country) => country.population >= minPopulation);
    setFilteredCountries(filteredData);
    setFilter(true);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMinPopulation(value); // Update state to show the current slider value
  };

  const handleSliderRelease = () => {
    filterByPopulation(minPopulation); // Filter countries after the slider is released
  };
  const displayedCountries = filter ? applySorting(filteredCountries) : applySorting(countries);

  return (
    <div className="outermostBox">
      <NavbarComponent />
      <div className="contentBox">
        <h1 className="countrypageHeader">{continent}</h1>

        <div className="controlsContainer">
          <button
            className="controlsButton"
            onClick={() => {
              setIsFilterDropdownOpen(!isFilterDropdownOpen);
              setIsSortingDropdownOpen(false);
            }}
          >
            Filter
          </button>
          {isFilterDropdownOpen && (
            <div className="filterDropdown">
              <label htmlFor="populationSlider">Filter by minimum Population: {minPopulation / 1000000} mill</label>
              <input
                type="range"
                id="populationSlider"
                min="0"
                max="100000000"
                step="1000000"
                value={minPopulation}
                onChange={handleSliderChange} // Update the value as the slider moves
                onMouseUp={handleSliderRelease} // Apply filtering when the mouse is released
                onTouchEnd={handleSliderRelease} // For mobile touch support
              />
            </div>
          )}
          <button
            className="controlsButton"
            onClick={() => {
              setIsSortingDropdownOpen(!isSortingDropdownOpen);
              setIsFilterDropdownOpen(false);
            }}
          >
            Sort
          </button>
          {isSortingDropdownOpen && (
            <div className="sortingDropdown">
              <button
                className="sortButton"
                onClick={() => {
                  setSortOption('alphabet');
                  setIsAscending(true);
                  setIsSortingDropdownOpen(false);
                }}
              >
                Sort A-Z
              </button>
              <button
                className="sortButton"
                onClick={() => {
                  setSortOption('alphabet');
                  setIsAscending(false);
                  setIsSortingDropdownOpen(false);
                }}
              >
                Sort Z-A
              </button>
              <button
                className="sortButton"
                onClick={() => {
                  setSortOption('population');
                  setIsAscending(true);
                  setIsSortingDropdownOpen(false);
                }}
              >
                Sort by Population (Ascending)
              </button>
              <button
                className="sortButton"
                onClick={() => {
                  setSortOption('population');
                  setIsAscending(false);
                  setIsSortingDropdownOpen(false);
                }}
              >
                Sort by Population (Descending)
              </button>
              <button
                className="sortButton"
                onClick={() => {
                  setSortOption('area');
                  setIsAscending(true);
                  setIsSortingDropdownOpen(false);
                }}
              >
                Sort by Area (Ascending)
              </button>
              <button
                className="sortButton"
                onClick={() => {
                  setSortOption('area');
                  setIsAscending(false);
                  setIsSortingDropdownOpen(false);
                }}
              >
                Sort by Area (Descending)
              </button>
            </div>
          )}
        </div>

        <CountryListComponent items={displayedCountries} />
      </div>
    </div>
  );
};

export default CountriesPageComponent;
