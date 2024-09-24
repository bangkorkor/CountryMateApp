import React, { useState } from 'react';
import './css/NavbarComponent.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import hamburgerImg from '../assets/hamburger.svg';

const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This determines the active button based on the current pathname, and is used to underline the active page later in the return statement.
  const currentPath = location.pathname;
  const activeButton =
    currentPath === '/'
      ? 'home'
      : currentPath === '/favorites'
        ? 'favorites'
        : currentPath === '/settings'
          ? 'settings'
          : '';

  // Navigation handlers
  const handleHomeClick = (): void => {
    navigate('/'); // Navigate to home route
  };

  const handleFavoritesClick = (): void => {
    navigate('/favorites'); // Navigate to favorites route
  };

  const handleSettingsClick = (): void => {
    navigate('/settings'); // Navigate to settings route
  };

  const handleHamburgerClick = (): void => {
    setIsMenuOpen(!isMenuOpen); // Toggle the showMenu state
  };

  return (
    <div className="navbarbox">
      <button className="logobutton" onClick={handleHomeClick}>
        <h1 className="logo">CM</h1>
      </button>

      <div className="menubox">
        <button onClick={handleHomeClick} className="navbox">
          <h1 className={`navtext ${activeButton === 'home' ? 'underline' : ''}`}>Homepage</h1>
        </button>
        <button onClick={handleFavoritesClick} className="navbox">
          <h1 className={`navtext ${activeButton === 'favorites' ? 'underline' : ''}`}>Favorites</h1>
        </button>
        <button onClick={handleSettingsClick} className="navbox">
          <h1 className={`navtext ${activeButton === 'settings' ? 'underline' : ''}`}>Settings</h1>
        </button>
        <button className="hamburger" onClick={handleHamburgerClick}>
          <img src={hamburgerImg}></img>
        </button>
        {isMenuOpen && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={handleHomeClick}>
              Homepage
            </button>
            <button className="dropdown-item" onClick={handleFavoritesClick}>
              Favorites
            </button>
            <button className="dropdown-item" onClick={handleSettingsClick}>
              Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
