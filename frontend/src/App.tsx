import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePageComponent from './components/HomePageComponent';
import SettingsPageComponent from './components/SettingsPageComponent';
import FavoritePageComponent from './components/FavoritePageComponent';
import CountriesPageComponent from './components/CountriesPageComponent';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyTheme = (mode: 'dark' | 'light') => {
    if (mode === 'dark') {
      document.documentElement.style.setProperty('--primary_color', '#3A4D39'); // Dark primary color
      document.documentElement.style.setProperty('--secondary_color', '#4F6F52'); // Dark secondary color
      document.documentElement.style.setProperty('--tertiary_color', '#ECE3CE'); // Dark secondary color
      document.documentElement.style.setProperty('--quaternary_color', '#ECE3CE'); // Dark secondary color
    } else {
      document.documentElement.style.setProperty('--primary_color', '#ECE3CE'); // Light primary color
      document.documentElement.style.setProperty('--secondary_color', '#739072'); // Light secondary color
      document.documentElement.style.setProperty('--tertiary_color', '#F1EEDC'); // Dark secondary color
      document.documentElement.style.setProperty('--quaternary_color', '#3A4D39'); // Dark secondary color
    }
  };

  // Function to toggle the theme and update localStorage
  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? 'dark' : 'light';
      applyTheme(theme);
      localStorage.setItem('theme', theme); // Save the theme preference
      return newMode;
    });
  };

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light mode
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setIsDarkMode(savedTheme === 'dark');
      applyTheme(savedTheme);
    } else {
      // Default to light mode if the saved theme is invalid or not set
      setIsDarkMode(false);
      applyTheme('light');
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/project1">
        {/* RouteHandler stays the same if it's handling other routing logic */}
        <RouteHandler />
        <Routes>
          <Route path="/" element={<HomePageComponent />} />
          <Route path="favorites" element={<FavoritePageComponent />} />
          <Route
            path="settings"
            element={<SettingsPageComponent isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle} />}
          />
          <Route path="continents/:continent" element={<CountriesPageComponent />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

//This functional component handles the logic for when the user navigates to a new page, and the new page is stored in the localstorage.
const RouteHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //This hook sets the "currentRoute" item in localstorage to the page the user is currently at. This updates every time the user navigates to a new page.
  useEffect(() => {
    localStorage.setItem('currentRoute', location.pathname);
  }, [location]);

  //When the page loads, this hook checks if there are any stored routes, and if so, it navigates to that page.
  //If the user is at the page that is stored, it does not do anything.
  useEffect(() => {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute && storedRoute !== location.pathname) {
      navigate(storedRoute);
    }
  }, [navigate, location.pathname]);

  return null;
};

export default App;
