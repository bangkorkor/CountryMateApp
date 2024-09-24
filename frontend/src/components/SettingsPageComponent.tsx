import NavbarComponent from './NavbarComponent';
import './css/SettingsPageComponent.css';
import '../index.css';
import React from 'react';

type SettingsPageProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

const SettingsPageComponent: React.FC<SettingsPageProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <div className="page">
      <div className="mainbox">
        <NavbarComponent></NavbarComponent>
        <div className="settingspagecontent">
          <div className="settingsbox">
            <h1 className="darkmodetext">Light/Dark Toggle Button</h1>

            <div>
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={isDarkMode}
                onChange={onToggleTheme}
              ></input>
              <label htmlFor="checkbox" className="checkbox-label">
                <span className="ball"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPageComponent;
