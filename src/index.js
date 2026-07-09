// // src/index.js
import "./styles.css";
import getWeather from "./weather-data.js";
import UpdateWeather, {
  getTemperatureUnit,
  UpdateFetchTime,
} from "./weather-display.js";

const updateButton = document.querySelector(".update-button");
const form = document.querySelector("form");

//Initial data
FetchData("Toronto", "uk");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const city = formData.get("city-input");
  const unit = formData.get("temp-unit") === "C" ? "uk" : "us";
  FetchData(city, unit);
});

updateButton.addEventListener("click", () => {
  FetchData(undefined, getTemperatureUnit());
});

function FetchData(m_place, m_tempUnit) {
  UpdateFetchTime(`Fetching Weather Data...`);

  // 1. Capture start time
  const startTime = performance.now();
  getWeather(m_place, m_tempUnit)
    .then((response) => {
      // 3. Capture end time
      const endTime = performance.now();

      // 4. Calculate total time in milliseconds
      const weatherFetchTime = endTime - startTime;

      UpdateFetchTime(`Task took ${weatherFetchTime.toFixed(2)} ms to finish.`);
      UpdateWeather(response);
    })
    .catch((error) => {
      console.error("Error fetching the weather:", error);
    });
}
