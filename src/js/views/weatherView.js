// Weather VIEW MODULE

// Google Maps API
import loadGoogleMapsApi from "load-google-maps-api";

// get references to View (HTML page) elements
import { pageElements } from "./base";

// include application configuration
import { apiKey_google_maps } from "../config";

/**
 * @name getZipCodeInput
 * Get Zip Code value from the Form input field.
 */
export const getZipCodeInput = () => pageElements.zipCodeInput.value;

/**
 * @name clearInput
 * Clear information from the Zip Code Form input field.
 */

export const clearInput = () => {
  pageElements.zipCodeInput.value = "";
};

/**
 * @name displayWeather
 * Display formatted Weather information in the View (HTML page).
 * @param {*} w weather data
 * @param {*} zipCode zip code
 */
export const displayWeather = (w, zipCode) => {
  /* ** debug ** */
  if (w.cod === 200) {
    console.log(`City/Station: ${w.name}`);
    console.log(`Reading As Of: ${getFullDateTime(w.dt)}`);
    console.log(`Current Temp: ${Math.round(w.main.temp)}`);
    console.log(`High Temp: ${Math.round(w.main.temp_max)}`);
    console.log(`Low Temp: ${Math.round(w.main.temp_min)}`);
    console.log(`Sunrise: ${getTimeOfDay(w.sys.sunrise)}`);
    console.log(`Sunset: ${getTimeOfDay(w.sys.sunset)}`);
    console.log(`Conditions: ${parseConditions(JSON.stringify(w.weather))}`);
    console.log(`Humidity: ${w.main.humidity} %`);
    console.log(`Windspeed: ${w.wind.speed} MPH`);
  }

  // load Google Map (using coordinates from the Weather data)
  if (w.cod === 200) {
    console.log(`loading map...`);
    loadGoogleMapsApi({ key: apiKey_google_maps })
      .then(function(googleMaps) {
        console.log(`map loaded!`);
        new googleMaps.Map(pageElements.weatherMap, {
          center: {
            lat: w.coord.lat,
            lng: w.coord.lon
          },
          zoom: 9
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  // build weather details (table)
  let weatherHtml = ``;

  if (w.cod === "404") {
    weatherHtml = `<h3 class="text-danger weatherTbl">Error: City Not found for Zip Code: ${zipCode}</h3>`;
  } else {
    weatherHtml = `
      <table class="table table-sm table-striped table-bordered table-condensed weatherTbl">
          <tbody>
            <tr>
              <td><b>Reading As Of:</b></th>
              <td>${getFullDateTime(w.dt)}</td>
            </tr>
            <tr>
              <td><b>City/Station:</b></th>
              <td>${w.name} (${zipCode})</td>
            </tr>
            <tr>
              <td><b>Current Temp:</b></th>
              <td>${Math.round(w.main.temp)} degrees fahrenheit</td>
            </tr>
            <tr>
              <td><b>High Temp:</b></th>
              <td>${Math.round(w.main.temp_max)} degrees fahrenheit</td>
            </tr>
            <tr>
              <td><b>Low Temp:</b></th>
              <td>${Math.round(w.main.temp_min)} degrees fahrenheit</td>
            </tr>
            <tr>
              <td><b>Sunrise:</b></th>
              <td>${getTimeOfDay(w.sys.sunrise)}</td>
            </tr>
            <tr>
              <td><b>Sunset:</b></th>
              <td>${getTimeOfDay(w.sys.sunset)}</td>
            </tr>
            <tr>
              <td><b>Conditions:</b></th>
              <td>${parseConditions(JSON.stringify(w.weather))}</td>
            </tr>
            <tr>
              <td><b>Humidity:</b></th>
              <td>${w.main.humidity} %</td>
            </tr>
            <tr>
              <td><b>Windspeed:</b></th>
              <td>${w.wind.speed} MPH</td>
            </tr>
          </tbody>
        </table>
    `;
  }

  // insert the results (html) into the View (HTML page)
  pageElements.weatherTable.insertAdjacentHTML("afterbegin", weatherHtml);
};

/**
 * @name getTimeOfDay
 * Convert/parse/reformat a the Weather data's clock time for human readablity
 * @param {*} dt UNIX date/time value (seconds since 1/1/1970)
 */
const getTimeOfDay = dt => {
  // convert from UNIX time
  const date = new Date(dt * 1000);

  // HH:MM AM|PM
  return `${
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  }:${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
};

/**
 * @name getFullDateTime
 * Convert/parse/reformat the Weather data's date/time for human readablity
 * @param {*} dt UNIX date/time value (seconds since 1/1/1970)
 */
const getFullDateTime = dt => {
  // convert from UNIX time
  const d = new Date(dt * 1000);

  // parse date/time elements
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const hour = d.getHours();
  let min = d.getMinutes();
  min = min.toString().padStart(2, "0");
  const sec = d.getSeconds();

  // build formatted date/time (Jan 1, 1970 at 12:00 AM|PM)
  return `${month} ${date}, ${year} at ${hour > 12 ? hour - 12 : hour}:${min} ${
    hour >= 12 ? "PM" : "AM"
  }`;
};

/**
 * @name parseConditions
 * parse the condition values ("Rain", "Snow", "Windy", etc...)
 * from the weather data
 * @param {*} weatherArray array of condition information
 */
const parseConditions = weatherArray => {
  // convert JSON string into an Array
  const weatherConditions = JSON.parse(weatherArray);

  // extract the conditions
  let str = "";
  for (let i = 0; i < weatherConditions.length; i++) {
    str += `${weatherConditions[i].main} `;
  }

  // remove trailing whitespace and insert commas
  str = str.trim();
  str = str.replace(/\s/g, ", ");

  return str;
};
