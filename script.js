/* ======================= DOM elements ======================= */
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const conditionLabel = document.getElementById("conditionLabel");
const rainValue = document.getElementById("rainValue");
const humidityValue = document.getElementById("humidityValue");
const visibilityValue = document.getElementById("visibilityValue");
const weatherImage = document.getElementById("weatherImage");
const locationName = document.getElementById("location");
const searchInput = document.getElementById("searchInput");

/* Theme-related elements */
const sidebar = document.querySelector(".weather-sidebar");
const brand = document.querySelector(".weather-brand");
const statsLabels = document.querySelectorAll(".weather-stat__label");
const statsValues = document.querySelectorAll(".weather-stat__value");

/* ======================= Weather logic ======================= */
function getWeatherCondition(temp, wind) {
  if (wind > 20) return "Windy Day";
  if (temp >= 25) return "Sunny Day";
  if (temp >= 15) return "Cloudy Day";
  return "Cold Day";
}

function getWeatherImage(condition) {
  if (condition.includes("Sunny")) return "images/img6.webp";
  if (condition.includes("Windy")) return "images/img3.webp";
  if (condition.includes("Cloudy")) return "images/img1.webp";
  return "images/img3.webp";
}

/* ======================= Theme handling ======================= */
function applyWeatherTheme(condition) {
  const isDarkWeather =
    condition.includes("Cold") ||
    condition.includes("Rainy") ||
    condition.includes("Windy");

  const isCloudy = condition.includes("Cloudy");

  /* ===== Cold / Rainy / Windy ===== */
  if (isDarkWeather) {
    document.body.style.backgroundColor = "#595880";
    sidebar.style.backgroundColor = "#CBCBE7";
    sidebar.style.opacity = "1";

    brand.style.color = "#595880";

    conditionLabel.style.color = "#FDFAE7";
    feelsLike.style.color = "#FDFAE7";
    locationName.style.color = "#FDFAE7";
    temperature.style.color = "#CBCBE7";

    statsLabels.forEach(el => (el.style.color = "#FDFAE7"));
    statsValues.forEach(el => (el.style.color = "#FDFAE7"));
    return;
  }

  /* ===== Cloudy ONLY ===== */
  if (isCloudy) {
    document.body.style.backgroundColor = "#B7B7E9";
    sidebar.style.backgroundColor = "#595880";
    sidebar.style.opacity = "0.85";

    brand.style.color = "#FDFAE7";

    conditionLabel.style.color = "#595880";
    feelsLike.style.color = "#595880";
    locationName.style.color = "#595880";
    temperature.style.color = "#595880";

    statsLabels.forEach(el => (el.style.color = "#595880"));
    statsValues.forEach(el => (el.style.color = "#595880"));
    return;
  }

  /* ===== Sunny (reset to default) ===== */
  document.body.style.backgroundColor = "";
  sidebar.style.backgroundColor = "";
  sidebar.style.opacity = "";

  brand.style.color = "";
  conditionLabel.style.color = "";
  feelsLike.style.color = "";
  locationName.style.color = "";
  temperature.style.color = "";

  statsLabels.forEach(el => (el.style.color = ""));
  statsValues.forEach(el => (el.style.color = ""));
}

/* ======================= Geocoding ======================= */
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

/* ======================= Weather fetch ======================= */
async function fetchWeather(lat, lon, cityName) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=relative_humidity_2m`;

    const res = await fetch(url);
    const data = await res.json();

    const temp = Math.round(data.current.temperature_2m);
    const wind = Math.round(data.current.wind_speed_10m);
    const humidity = data.hourly.relative_humidity_2m[0];

    const condition = getWeatherCondition(temp, wind);

    temperature.textContent = `${temp}°`;
    feelsLike.textContent = `Feels like ${temp - 2}°`;
    conditionLabel.textContent = condition;
    humidityValue.textContent = `${humidity}%`;
    rainValue.textContent = "—";
    visibilityValue.textContent = "—";
    weatherImage.src = getWeatherImage(condition);
    locationName.textContent = cityName;

    applyWeatherTheme(condition);

  } catch (err) {
    console.error("Weather request failed", err);
  }
}

/* ======================= Search handler ======================= */
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

/* ======================= Default load ======================= */
fetchWeather(52.52, 13.41, "Berlin");
