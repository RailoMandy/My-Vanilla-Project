function refreshWeather(response){
let temperatureElement=document.querySelector("#temperature");
let temperature=response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windSpeedElement=document.querySelector("#wind-speed")
let timeElement=document.querySelector("#time")
let date=new date(response.data.time*1000)

timeElement.innerHTML=formatDate();
cityElement.innerHTML = response.data.city;
descriptionElement.innerHTML=response.data.condition.description;
temperatureElement.innerHTML = Math.round(temperature);
humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML=`${response.data.wind.speed}m/s`;

}

function formatDate(date){
    let minutes=date.getMinutes();
    let hours=date.getHours();
    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "ThursDay",
        "Friday",
        "Saturday"];
 let day=day[date.getDay()];
 if (minutes<10){minutes=`0${minutes}`
}

 return`${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey = "7e00d8f1t71e42efc318143acbd6e2oa";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);