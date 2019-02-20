// APPLICATION - MVC - Controller MODULE

// include other files w/ webpack entry point
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/styles.css";
import "../assets/static/icons.svg";
import "load-google-maps-api";

// include references to external module files (Model & View)
import Weather from "./models/Weather";
import * as weatherView from './views/weatherView';
import { pageElements, renderLoader, clearLoader, clearWeather, showMap } from './views/base';

/**
 * GLOBAL APP STATE
 */
const state = {};

console.log("ES6-starter - webpack workflow - Version 1.0.0");

/**
 * WEATHER CONTROLLER
 */
const controlWeather = async () => {
  state.weather = new Weather(state.zipCode);
  console.log(`Zip code ok?: ${validateZipCode(state.zipCode)}`);

  // get and display the current day's weather
  try {
    showMap(false);
    clearWeather();
    renderLoader(pageElements.weatherTable);
    
    await state.weather.getTodaysWeather()
    .then(() => new Promise(resolve => setTimeout(resolve, 1500)))
    console.log(`Weather Status: ${JSON.stringify(state.weather.todaysWeather.status)}`);
    console.log(`Weather Data: ${JSON.stringify(state.weather.todaysWeather.data)}`);
    
    clearLoader();
    showMap(true);

    if (JSON.stringify(state.weather.todaysWeather.status) === "404") {
      console.log(`Error: City Not Found for Zip Code ${state.zipCode}`);
      showMap(false);
    } 

    weatherView.displayWeather(state.weather.todaysWeather.data, state.zipCode);
    weatherView.clearInput();
  } catch (error) {
    console.log(`There was an error getting the weather: ${error}`);
    weatherView.displayWeather(state.weather.todaysWeather.data, state.zipCode);
    weatherView.clearInput();
  }

};

/**
 * define event listner(s) 
 */
// EVENT: page load
window.addEventListener('load', () => {
  
  // initialize app State
  state.zipCode = "60465";

  // invoke Weather Controller
  if (validateZipCode(state.zipCode)) {
    controlWeather();
  } else {
    console.log(`ERROR: ${state.zipCode} is an invalid Zip Code`);
    alert(`ERROR: ${state.zipCode} is an invalid Zip Code`);
  };

});

// EVENT: Zip Code submitted from form
pageElements.weatherUpdateForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // get submitted Zip Code
  state.zipCode = weatherView.getZipCodeInput();

  // validate Zip Code format and re-invoke the Controller
  if (validateZipCode(state.zipCode)) {
    controlWeather();
  } else {
    console.log(`ERROR: ${state.zipCode} is an invalid Zip Code`);
    alert(`ERROR: ${state.zipCode} is an invalid Zip Code`);
  };

});

 /**
  * validate a Zip Code
  * @param {*} zipCode 
  */
const validateZipCode = (zipCode) => {
  var validZipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
  return validZipCodePattern.test(zipCode);
}
