import { useNavigate } from 'react-router-dom';
import './css/ContinentComponent.css';
import React from 'react';

type ContinentComponentProps = {
  continentName: string;
  continentPicture: string;
};

const ContinentComponent: React.FC<ContinentComponentProps> = ({ continentName, continentPicture }) => {
  const navigate = useNavigate();

  const handleOnclick = (continent: string): void => {
    navigate(`/continents/${continent}`); // Correct usage with backticks
  };

  return (
    <div className="ContinentCard" onClick={() => handleOnclick(continentName)}>
      <h1 className="ContinentHeading">{continentName}</h1>
      <img className="ContinentPicture" src={continentPicture} alt="Continent" />
    </div>
  );
};

export default ContinentComponent;
