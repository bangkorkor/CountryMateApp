import React, { useEffect } from 'react';
import './css/CountryCardComponent.css';
import closeImage from '../assets/closebuttonimage.svg';

interface ClosingProps {
  closeCard: () => void; // Function to be called when the close button is clicked
}

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  capital: string;
}

const CountryCardComponent: React.FC<ClosingProps & Country> = ({
  closeCard,
  name,
  flag,
  area,
  population,
  capital,
}) => {
  // Event listener for Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCard();
      }
    };

    // Add event listener to listen for keydown events
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeCard]); // The dependency array ensures the effect runs only when the component mounts or unmounts

  return (
    <>
      <div className="overlay">
        <div className="countrycard">
          <button className="closecountrycardbutton" onClick={closeCard}>
            <img className="closeimage" src={closeImage} alt="Close" />
          </button>
          <h1 className="countryheader">{name}</h1>
          <img className="flagimage" src={flag} alt={`Flag of ${name}`} />
          <div className="countryinfo">
            <p>
              <span className="label">Capital:</span> <span className="value">{capital}</span>
            </p>
            <p>
              <span className="label">Population:</span> <span className="value">{population.toLocaleString()}</span>
            </p>
            <p>
              <span className="label">Area:</span> <span className="value">{area.toLocaleString()} km²</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryCardComponent;
