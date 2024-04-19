function searchCity(city) {
  let apiKey = "7e00d8f1t71e42efc318143acbd6e2oa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      if (response.data.city) {
        refreshWeather(response);
      } else {
        console.error("Invalid city name:", city);
        displayErrorMessage();
      }
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
      displayErrorMessage();
    });
}

function displayErrorMessage() {
  temperatureElement.innerHTML = "";
  cityElement.innerHTML = "Invalid city name";
  descriptionElement.innerHTML = "";
  humidityElement.innerHTML = "";
  windSpeedElement.innerHTML = "";
  iconElement.innerHTML = "";
  timeElement.innerHTML = "";
}

function refreshWeather(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="emoji-icon"
            class="weather-app-emoji">`;
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = `${Math.round(
    temperature
  )}<span class="current-temperature-unit">°C</span>`;

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}m/s`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "7e00d8f1t71e42efc318143acbd6e2oa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="forecast-icon">
          <img src="${day.condition.icon_url}" class="weather-day">
        </div>
        <div class="forecast-temperatures">
          <span class="min-temp">${Math.round(day.temperature.minimum)}°</span>
          <span class="max-temp">${Math.round(day.temperature.maximum)}°</span>
        </div>
      </div>
    `;
    }
  });

  let forecastContainer = document.querySelector("#forecast");
  forecastContainer.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let searchButton = document.querySelector(".search-form-button");
searchButton.addEventListener("click", handleSearchSubmit);
