// APPLICATION - MVC - Sample Model MODULE

// include application configuration
import { apiKey_openweathermap_org } from "../config";

// http client
import axios from "axios";

/**
 * ============
 * Sample Class
 * ============
 */
export default class Sample {
  constructor(zipCode) {
    this.zipCode = zipCode;
  }

  /**
   * asynchronus Internet API call (Get Weather Data)
   */
  async getTodaysWeather() {
    try {
      const response = await axios(`http://api.openweathermap.org/data/2.5/weather?zip=${this.zipCode},us&APPID=${apiKey_openweathermap_org}`);
      console.log(`API Call Response (data): ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
        alert(`There was an API Call Error: ${error}`);
        console.log(error);
    }
  }
}
