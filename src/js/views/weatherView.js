// APPLICATION - MVC - Weather VIEW MODULE

// get references to HTML page elements
import { pageElements } from './base';

// get Zip Code from input field
export const getZipCodeInput = () => pageElements.zipCodeInput.value;

// clear Zip Code input field
export const clearInput = () => {
    pageElements.zipCodeInput.value = '';
};

// display formatted Weather information on page
// TODO: render HTML
export const displayWeather = (w) => {
    console.log(`City/Station: ${w.name}`);
    console.log(`Reading As Of: ${getFullDateTime(w.dt)}`);
    console.log(`Current Temp: ${Math.round(w.main.temp)}`);
    console.log(`High Temp: ${Math.round(w.main.temp_max)}`);
    console.log(`Low Temp: ${Math.round(w.main.temp_min)}`);
    console.log(`Sunrise: ${getTimeOfDay(w.sys.sunrise)}`);
    console.log(`Sunset: ${getTimeOfDay(w.sys.sunset)}`)
    console.log(`Conditions: ${parseConditions(JSON.stringify(w.weather))}`);
    console.log(`Humidity: ${w.main.humidity} %`);
    console.log(`Windspeed: ${w.wind.speed} MPH`);
};

/**
 * Additional functions
 */
const getTimeOfDay = (dt) => {
    // convert from UNIX time
    const date = new Date(dt * 1000);

    return `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
};

const getFullDateTime = (dt) => {
    // convert from UNIX time
    const d = new Date(dt * 1000);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const date = d.getDate();
    const hour = d.getHours();
    let min = d.getMinutes();
    min = min.toString().padStart(2, "0")
    const sec = d.getSeconds();

    return `${month} ${date}, ${year} at ${hour > 12 ? hour - 12 : hour}:${min} ${hour >= 12 ? "PM" : "AM"}`;
};

const parseConditions = (weatherArray) => {
    // convert JSON string into an Array
    const weatherConditions = JSON.parse(weatherArray);
    
    // extract the conditions
    let str = "";
    for (let i = 0; i < weatherConditions.length; i++) {
        str += `${weatherConditions[i].main} `;
    }

    // insert commas
    str = str.trim()
    str = str.replace(/\s/g, ", ");
    
    return str;
}