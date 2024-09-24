# CountryMate

Link to webpage: http://it2810-22.idi.ntnu.no/project1/, only for Eduroam wifi.

## Introduction

The purpose of our solution was to create an easy and intuitive website where users could browse different countries by continent. When browsing each continent, the user has the option to view the most vital information about a country by selecting it.

## Technologies Used

CountryMate follows the requirements of being coded in TypeScript, utilizing the React framework.

## Functionality

### Homepage

We designed the homepage to display the 6 different continents that users can explore.

### Countries Page

By selecting a continent, the webpage navigates to a country page for that continent, where users can browse all the countries within it. Users can sort the displayed countries in different ways and filter out countries based on a minimum population. Users also have the ability to add countries as favorites by clicking the star icon in the upper-right corner of the country card.

### Favorites Page

On the favorites page, the countries that users have marked as favorites are displayed, with a similar layout to the countries page.

### Settings

On this page, users can toggle between light mode and dark mode.

## Architecture

We have structured the project within the folder `project_1`. Since there is no backend for this project, we only have a folder for the frontend and this README file containing the documentation.

## API

File: `project_1/frontend/api/API.ts`

In this file, data is fetched from the REST API at [REST Countries API](https://restcountries.com/). The file contains two functions: `fetchCountriesByContinent` and `fetchFavoriteCountries`. These functions fetch data for all countries in one call and then filter the data by continent or favorite countries. Ideally, the API calls would handle the filtering, but due to API limitations, this was not possible. The received data includes the following fields: name, flags, continents, population, area, and capital for each country.

## Components

### Responsive Design

For all components, we implemented a responsive design, adjusting the layout for different device sizes. On a wide screen, content is mainly presented in columns, while on smaller screens (e.g., mobile phones), content is displayed in rows. The navigation bar also adapts to different screen sizes.

### HomepageComponent

The `HomepageComponent` is presented with the initial routing. No API calls are made here. This page is hardcoded, presenting the 6 possible continents of the world that the user can choose to explore. Selecting a continent navigates the user to the `CountriesPage` for that continent.

### CountriesPageComponent

The `CountriesPageComponent` presents all countries within the selected continent. When a continent is selected, the `UseQuery` hook from `tanstack` is called, which returns the relevant data. Each country is represented by a `CountryCardComponent`, and all country cards are displayed as part of the `CountryListComponent`. By default, countries are displayed in alphabetical order (A-Z) with no population filter. Sorting and filtering preferences are saved in `sessionStorage` so that they persist across page refreshes. However, filters are reset when navigating to another continent.

### FavoritePageComponent

Countries can be favorited by clicking the star icon on the `CountryCard`. Favorite countries are saved in `localStorage` to ensure that they persist across sessions. The `FavoritePageComponent` displays all favorited countries.

## Testing

For testing, we used **Vitest** as our test framework. Below are the tests we wrote for various components:

### App Component

- **Route Navigation:**
  - The test ensures that the app correctly updates the `currentRoute` in `localStorage` when navigating between pages.
  - Example: When navigating to `/favorites`, it ensures that the correct route is stored.
- **Theme Application:**
  - The test verifies that the correct theme (light or dark) is applied from `localStorage` when the app loads.

### SettingsPageComponent

- **Dark Mode Checkbox:**
  - A test confirms that the checkbox is marked as "checked" when dark mode is enabled.
- **Theme Toggle:**
  - The test checks if the `onToggleTheme` function is triggered when the checkbox is toggled.

### ContinentComponent

- **Rendering Check:**
  - Tests ensure that both the continent name (e.g., "Europe") and image are rendered correctly.
- **Navigation Check:**
  - A test simulates a click event on a continent card and ensures it navigates to the correct route, e.g., `/continents/Asia`.

### FavoritePageComponent

- **Loading from LocalStorage:**
  - Tests check that the favorite countries stored in `localStorage` (e.g., Norway and Sweden) are correctly loaded and rendered.
- **Mocking API Calls:**
  - The API call to fetch favorite countries is mocked, allowing the component to be tested without making real network requests.

### API Testing

For testing the API functions, we ensured that both `fetchCountriesByContinent` and `fetchFavoriteCountries` were thoroughly tested using Vitest.

- **Mocking Fetch Requests:**
  We mock the global `fetch` function using `vi.fn()` to simulate responses from the RestCountries API. This allows us to test the logic of the API functions without making real network requests.
- **fetchCountriesByContinent:**
  This function fetches countries filtered by a specific continent. The test verifies that:
  - Only the countries belonging to the given continent (e.g., Europe) are returned.
  - The fetch request is made with the correct URL.
  - An error is thrown if the fetch request fails.
- **fetchFavoriteCountries:**
  This function fetches a list of favorite countries based on their names. The test ensures that:
  - The correct favorite countries (e.g., Norway) are returned based on the list provided.
  - The fetch request is made with the appropriate URL and throws an error if the request fails.
