// // src/index.js
import "./styles.css";

const errorText = document.querySelector(".error");
const cityText = document.querySelector(".city-name");
const weatherText = document.querySelector(".weather");
const temperatureText = document.querySelector(".temperature");
const unitText = document.querySelector(".unit-text");
const lastUpdated = document.querySelector(".last-updated");
const updateButton = document.querySelector(".update-button");

const form = document.querySelector("form");
const celsiusRadio = document.getElementById("celsius");
const timeTakenText = document.getElementById("api-time");

let place = "";
let errorPlace = "";

async function getWeather(m_place, m_tempUnit) {
  try {
    errorPlace = m_place;
    timeTakenText.textContent = `Fetching Weather Data...`;

    // 1. Capture start time
    const startTime = performance.now();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${m_place}?unitGroup=${m_tempUnit}&key=XZ7QS88NDFT6EPKPV35ZNL5ZW&contentType=json`,
    );
    // 3. Capture end time
    const endTime = performance.now();

    // 4. Calculate total time in milliseconds
    const timeTaken = endTime - startTime;

    timeTakenText.textContent = `Task took ${timeTaken.toFixed(2)} ms to finish.`;
    console.log(response);
    if (response.ok === true) {
      place = m_place;
      const weatherData = await response.json();
      console.log("fetched data");
      console.log(weatherData);
      return weatherData;
    }
  } catch (error) {
    console.error("Error fetching the Weather:", error);
  }
}
async function loadWeatherIcon(m_iconName) {
  const weatherIcon = await import(`./weather-icons/${m_iconName}.svg`);
  const weatherImageIcon = document.querySelector(".weather-icon");
  console.log(weatherIcon.default);
  weatherImageIcon.src = weatherIcon.default;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  const formData = new FormData(event.target);
  const city = formData.get("city-input");
  const unit = formData.get("temp-unit") === "C" ? "uk" : "us";
  console.log(formData.entries());
  console.log(city);
  console.log(unit);
  getWeather(city, unit).then((response) => {
    UpdateWeather(response);
    if (response != undefined) {
      UpdateTemperatureUnit(unit);
    }
  });

  //Not needed
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
});

updateButton.addEventListener("click", () => {
  getWeather(place, celsiusRadio.checked ? "uk" : "us").then((response) => {
    UpdateWeather(response);
    if (response != undefined) {
      UpdateTemperatureUnit(celsiusRadio.checked ? "uk" : "us");
    }
  });
});

function UpdateWeather(response) {
  if (response === undefined) {
    //return if the address isnt being found
    errorText.textContent = "Can't find location: " + errorPlace;
    return;
  }
  errorText.textContent = "";

  console.log(response);
  cityText.textContent = response.resolvedAddress;
  console.log(response.days[0].temp);

  const currentHour = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: false,
  });

  temperatureText.textContent = response.days[0].hours[currentHour - 1].temp;

  weatherText.textContent = response.days[0].hours[currentHour - 1].conditions;

  lastUpdated.textContent =
    "last updated: " +
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit", // Optional
      hour12: true,
    });

  loadWeatherIcon(response.days[0].hours[currentHour - 1].icon);
}

function UpdateTemperatureUnit(unit) {
  console.log(unit);
  switch (unit) {
    case "uk":
      unitText.textContent = "°C";
      break;
    case "us":
      unitText.textContent = "°F";
      break;
  }
}

getWeather("Port Elgin", "uk")
  .then((response) => {
    UpdateWeather(response);
  })
  .catch((error) => {
    console.error("Error fetching the Gif:", error);
  });

/* <label for="city-input">Enter a city:</label>
        <input type="text" id="city-input" />
        <button>Search</button>
        <input type="radio" name="temp-unit" id="Celsius" value="C" checked />
        <label for="Celsius">Celsius</label>
        <input type="radio" name="temp-unit" id="fahrenheit" value="F" />
        <label for="fahrenheit">Fahrenheit</label>
        */

// import { greeting } from "./greeting.js";

// console.log(greeting);

// // src/index.js
// import testImage from "./ramenTest.jpg";

// const image = document.createElement("img");
// image.src = testImage;

// document.body.appendChild(image);

// let hi = "hi";
// let hello = () => console.log("hey");
// hello();

// import weatherBrain from "./weather.js";

// console.log(
//   fetch(
//     "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Port%20Elgin?unitGroup=us&key=XZ7QS88NDFT6EPKPV35ZNL5ZW&contentType=json",
//   ),
// );
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=XZ7QS88NDFT6EPKPV35ZNL5ZW
