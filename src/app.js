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
let celsiusTemp = null;
let myKey = "68548d6af374817b9b8a629525c6ac52";
let cityName = "sydney";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}&units=${units}`;
axios.get(apiUrl).then(showCityWeather);
