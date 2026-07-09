const errorText = document.querySelector(".error");
const cityText = document.querySelector(".city-name");
const weatherText = document.querySelector(".weather");
const temperatureText = document.querySelector(".temperature");
const unitText = document.querySelector(".unit-text");
const lastUpdated = document.querySelector(".last-updated");
const searchInput = document.getElementById("city-input");

const celsiusRadio = document.getElementById("celsius");
const timeTakenText = document.getElementById("api-time");

async function loadWeatherIcon(m_iconName) {
  const weatherIcon = await import(`./weather-icons/${m_iconName}.svg`);
  const weatherImageIcon = document.querySelector(".weather-icon");
  console.log("Loaded weather icon");
  weatherImageIcon.src = weatherIcon.default;
}

export default function UpdateWeather(response) {
  if (response === undefined) {
    //return if the address isnt being found
    errorText.textContent = "Can't find location: " + searchInput.value;
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
  UpdateTemperatureUnit();
}

function UpdateTemperatureUnit() {
  let unit = getTemperatureUnit();
  switch (unit) {
    case "uk":
      unitText.textContent = "°C";
      break;
    case "us":
      unitText.textContent = "°F";
      break;
  }
}
export function getTemperatureUnit() {
  return celsiusRadio.checked ? "uk" : "us";
}

export function UpdateFetchTime(timeTaken) {
  timeTakenText.textContent = timeTaken;
}
