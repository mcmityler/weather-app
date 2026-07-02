// src/index.js
import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

// src/index.js
import testImage from "./ramenTest.jpg";

const image = document.createElement("img");
image.src = testImage;

document.body.appendChild(image);

let hi = "hi";
let hello = () => console.log("hey");
hello();

import weatherBrain from "./weather.js";

console.log(
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Port%20Elgin?unitGroup=us&key=XZ7QS88NDFT6EPKPV35ZNL5ZW&contentType=json",
  ),
);
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=XZ7QS88NDFT6EPKPV35ZNL5ZW

async function getWeather(place, tempUnit) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=${tempUnit}&key=XZ7QS88NDFT6EPKPV35ZNL5ZW&contentType=json`,
    );
    const weatherData = await response.json();
    console.log("fetched data");
    console.log(weatherData.days[0].temp);
    console.log(weatherData);
  } catch (error) {
    console.error("Error fetching the Weather:", error);
  }
}
getWeather("Toronto", "us");
