import NavbarComponent from './NavbarComponent';
import ContinentComponent from './ContinentComponent';
import './css/HomePageComponent.css';
import africa from '../assets/africa1.png';
import asia from '../assets/asia1.png';
import australia from '../assets/australia1.png';
import europe from '../assets/europe1.png';
import north_america from '../assets/north-america1.png';
import south_america from '../assets/south-america1.png';
import React from 'react';

const HomePageComponent: React.FC = () => {
  return (
    <div className="Page">
      <NavbarComponent></NavbarComponent>
      <div className="Text">
        <h1 className="HomePageTitle"> Welcome to CountryMate! </h1>
        <h3 className="HomePageDescription"> Start by selecting a continent </h3>
      </div>
      <div className="ContinentCards">
        <ContinentComponent continentName="North America" continentPicture={north_america}></ContinentComponent>
        <ContinentComponent continentName="South America" continentPicture={south_america}></ContinentComponent>
        <ContinentComponent continentName="Africa" continentPicture={africa}></ContinentComponent>
        <ContinentComponent continentName="Europe" continentPicture={europe}></ContinentComponent>
        <ContinentComponent continentName="Asia" continentPicture={asia}></ContinentComponent>
        <ContinentComponent continentName="Oceania" continentPicture={australia}></ContinentComponent>
      </div>
    </div>
  );
};

export default HomePageComponent;
