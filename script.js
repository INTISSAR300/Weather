/* =======================
   DOM elements
   ======================= */
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const conditionLabel = document.getElementById("conditionLabel");
const rainValue = document.getElementById("rainValue");
const humidityValue = document.getElementById("humidityValue");
const visibilityValue = document.getElementById("visibilityValue");
const weatherImage = document.getElementById("weatherImage");
const locationName = document.getElementById("location");
const searchInput = document.getElementById("searchInput");

/* Decide the weather text based on temp & wind */
function getWeatherCondition(temp, wind) {
  if (wind > 20) return "Windy Day";
  if (temp >= 25) return "Sunny Day";
  if (temp >= 15) return "Cloudy Day";
  return "Cold Day";
}

/* Pick an image that matches the condition */
function getWeatherImage(condition) {
  if (condition.includes("Sunny")) return "images/img6.webp";
  if (condition.includes("Windy")) return "images/img1.webp";
  if (condition.includes("Cloudy")) return "images/img1.webp";
  return "images/img3.webp";
}

/* Get lat & lon from city name */
async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || !data.results.length) return null;

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name
  };
}

/* Fetch weather and update the UI */
async function fetchWeather(lat, lon, cityName) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=relative_humidity_2m`;

    const res = await fetch(url);
    const data = await res.json();

    const temp = Math.round(data.current.temperature_2m);
    const wind = Math.round(data.current.wind_speed_10m);
    const humidity = data.hourly.relative_humidity_2m[0];

    const condition = getWeatherCondition(temp, wind);

    // update UI
    temperature.textContent = `${temp}°`;
    feelsLike.textContent = `Feels like ${temp - 2}°`;
    conditionLabel.textContent = condition;
    humidityValue.textContent = `${humidity}%`;
    rainValue.textContent = "—";
    visibilityValue.textContent = "—";
    weatherImage.src = getWeatherImage(condition);
    locationName.textContent = cityName;

  } catch (err) {
    console.error("Weather request failed", err);
  }
}

/* Search when user presses Enter */
searchInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const city = searchInput.value.trim();
  if (!city) return;

  const coords = await getCoordinates(city);
  if (!coords) {
    alert("City not found");
    return;
  }

  fetchWeather(coords.lat, coords.lon, coords.name);
});

/* Default city */
fetchWeather(52.52, 13.41, "Berlin");
