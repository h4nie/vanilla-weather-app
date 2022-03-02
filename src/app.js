function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecast = `<div class="row">`;
  let forcastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forcastDays.forEach(function addForecastHtml(day) {
    forecast =
      forecast +
      `<div class="col-2">
       <div>${day}</div>
       <img
         src="https://ssl.gstatic.com/onebox/weather/48/snow_light.png"
         alt="weather"
       />
       <div>
         <span>12°</span> <span>3°</span>
       </div>
     </div>`;
  });
  forecastElement.innerHTML = forecast + `</div>`;
}
function showCityWeather(response) {
  celsiusTemp = response.data.main.temp;
  let cityElement = document.querySelector("#city-name");

  cityElement.innerHTML = response.data.name;
  let todayTempElement = document.querySelector("#today-temperature");
  todayTempElement.innerHTML = Math.round(celsiusTemp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  let date = new Date(response.data.dt * 1000);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let minutesElement = document.querySelector("#minutes");
  minutesElement.innerHTML = minutes;
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let hoursElement = document.querySelector("#hours");
  hoursElement.innerHTML = hours;
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

  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = day;
}
function makeApiUrl(city) {
  let myKey = "68548d6af374817b9b8a629525c6ac52";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=${units}`;
  axios.get(apiUrl).then(showCityWeather);
}
function getCityName(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#search-city-input");
  let cityName = cityNameElement.value;
  makeApiUrl(cityName);
}
function showFahrenheit() {
  let temperatureElement = document.querySelector("#today-temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  let celsiusUnitElement = document.querySelector("#celsius-link");
  celsiusUnitElement.classList.remove("active");
  let fahrenheitUnitElement = document.querySelector("#fahrenheit-link");
  fahrenheitUnitElement.classList.add("active");
}
function showCelsius() {
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let celsiusUnitElement = document.querySelector("#celsius-link");
  celsiusUnitElement.classList.add("active");
  let fahrenheitUnitElement = document.querySelector("#fahrenheit-link");
  fahrenheitUnitElement.classList.remove("active");
}
let celsiusTemp = null;
makeApiUrl("Toronto");
let searchCityButton = document.querySelector("#search-city-form");
searchCityButton.addEventListener("submit", getCityName);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

displayForecast();
