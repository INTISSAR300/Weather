/* =====================================================
   DOM REFERENCES
   ===================================================== */
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const conditionLabel = document.getElementById("conditionLabel");
const rainValue = document.getElementById("rainValue");
const humidityValue = document.getElementById("humidityValue");
const visibilityValue = document.getElementById("visibilityValue");
const weatherImage = document.getElementById("weatherImage");
const locationName = document.getElementById("location");
const searchInput = document.getElementById("searchInput");

/* =====================================================
   WEATHER STATE LOGIC
   Determines weather label based on data
   ===================================================== */
function getWeatherCondition(temp, wind) {
  if (wind > 20) return "Windy Day";
  if (temp >= 25) return "Sunny Day";
  if (temp >= 15) return "Cloudy Day";
  return "Cold Day";
}

/* =====================================================
   WEATHER IMAGE MAPPING
   Maps weather state to visual assets
   ===================================================== */
function getWeatherImage(condition) {
  if (condition.includes("Sunny")) return "images/img6.webp";
  if (condition.includes("Windy")) return "images/img1.webp";
  if (condition.includes("Cloudy")) return "images/img1.webp";
  return "images/img3.webp";
}

/* =====================================================
   GEOCODING
   Converts city name into latitude & longitude
   ===================================================== */
async function getCoordinates(city) {
  const GEO_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  const response = await fetch(GEO_URL);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name
  };
}

/* =====================================================
   WEATHER FETCH
   Fetches weather data using coordinates
   ===================================================== */
async function fetchWeather(lat, lon, cityName) {
  try {
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=relative_humidity_2m`;

    const response = await fetch(API_URL);
    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const wind = Math.round(data.current.wind_speed_10m);
    const humidity = data.hourly.relative_humidity_2m[0];

    const condition = getWeatherCondition(temp, wind);

    /* -------- UI UPDATE -------- */
    temperature.textContent = `${temp}°`;
    feelsLike.textContent = `Feel like ${temp - 2}°`;
    conditionLabel.textContent = condition;
    humidityValue.textContent = `${humidity}%`;
    rainValue.textContent = "—";
    visibilityValue.textContent = "—";
    weatherImage.src = getWeatherImage(condition);
    locationName.textContent = cityName;

  } catch (error) {
    console.error("Weather fetch failed:", error);
  }
}

/* =====================================================
   USER INPUT HANDLER
   Triggers search on Enter key
   ===================================================== */
searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();
    if (!city) return;

    const coords = await getCoordinates(city);

    if (!coords) {
      alert("City not found");
      return;
    }

    fetchWeather(coords.lat, coords.lon, coords.name);
  }
});

/* =====================================================
   INITIAL LOAD
   Default city on page load
   ===================================================== */
fetchWeather(52.52, 13.41, "Berlin");
