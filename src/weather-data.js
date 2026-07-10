let place = "";

export default async function getWeather(m_place = place, m_tempUnit) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${m_place}?unitGroup=${m_tempUnit}&key=XZ7QS88NDFT6EPKPV35ZNL5ZW&contentType=json`,
    );

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
