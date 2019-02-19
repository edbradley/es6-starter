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
export const displayWeather = (w, zipCode) => {
    // ** debug **
    if (w.cod === 200) {
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
    }

    // clear previous details table (if it exists)
    const wt = document.querySelector(`.weatherTbl`);
    if (wt) wt.parentElement.removeChild(wt);

    // build error message detail
    let weatherHtml = ``;
    if (w.cod === "404") {
      weatherHtml = `<h3 class="weatherTbl">Error: City Not found for Zip Code: ${zipCode}</h3>`;
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
    
  // insert the html into the page
  pageElements.weatherTable.insertAdjacentHTML('beforeend', weatherHtml);
    
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