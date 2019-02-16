// APPLICATION - MVC - Controller MODULE

// include other files w/ webpack entry point
import "../css/styles.css";
import "../assets/static/favicon.ico";

// include app configuration
import { zipCode } from "./config";

// include references to external module files (Model & View)
import Sample from "./models/Sample";

/**
 * GLOBAL APP STATE
 */
const state = {};

// test access to external modules
console.log("ES6-starter - webpack workflow");

/**
 * SAMPLE CONTROLLER
 */
const controlSample = async () => {
  state.weather = new Sample(zipCode);

  try {
    state.weather.data = await state.weather.getTodaysWeather();
    console.log(`Weather Data: ${JSON.stringify(state.weather.data)}`);
  } catch (error) {
    console.log(error);
    alert(`There was an error: ${error}`);
  }
  
};

controlSample();


