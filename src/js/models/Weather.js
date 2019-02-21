// Weather MODEL MODULE

// include application configuration
import {
  apiKey_openweathermap_org,
  weather_units_openweathermap_org
} from "../config";

// http client (https://www.npmjs.com/package/axios)
import axios from "axios";

/**
 * =============
 * Weather Class
 * =============
 */
export default class Weather {
  constructor(zipCode) {
    this.zipCode = zipCode;
  }

  /**
   * @name getTodaysWeather
   * Get Today's Current Weather Data - by Zip Code (via asynchronous Internet API call)
   * https://openweathermap.org
   */
  async getTodaysWeather() {
    try {
      const response = await axios(
        `http://api.openweathermap.org/data/2.5/weather?zip=${
          this.zipCode
        },us&APPID=${apiKey_openweathermap_org}&units=${weather_units_openweathermap_org}`
      );
      console.log(`API Call Response: ${JSON.stringify(response)}`);
      this.todaysWeather = response;
      this.todaysWeather.status = response.status;
    } catch (error) {
      this.todaysWeather = error.response;
      this.todaysWeather.status = error.response.status;
      console.error(
        `There was an API Call Error: ${JSON.stringify(error.response)}`
      );
    }
  }
}
