let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let temperature;

let todayDate = document.querySelector("#day-time");
todayDate.innerHTML = `${day}, ${hours}:${minutes}`;

function showTemperature(response) {
  temperature = Math.round(response.data.main.temp);
  let message = `${temperature}`;
  let h2 = document.querySelector("#current-temperature");
  h2.innerHTML = message;
}

function changeIcon(response) {
  console.log(response);
  let iconElement = response.data.weather[0].icon;
  let h2 = document.querySelector("#icon");
  h2.setAttribute(
    "src",
    `http://www.openweathermap.org/img/wn/${iconElement}@2x.png`
  );
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = city;
  let apiKey = "bb0d4750adbaf8dd371419162d9174d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(changeClouds);
  axios.get(apiUrl).then(changeWind);
  axios.get(apiUrl).then(changeHumidity);
  axios.get(apiUrl).then(changeIcon);
  axios.get(apiUrl).then(getForecast);
}

function changeClouds(response) {
  let clouds = response.data.clouds.all;
  let cloudMessage = `${clouds}% `;
  let h3 = document.querySelector("#current-clouds");
  h3.innerHTML = cloudMessage;
}

function changeWind(response) {
  let wind = response.data.wind.speed;
  let windMessage = `${wind}`;
  let h3 = document.querySelector("#current-wind");
  h3.innerHTML = windMessage;
}

function changeHumidity(response) {
  let humidity = response.data.main.humidity;
  let humidityMessage = `${humidity}%`;
  let h3 = document.querySelector("#current-humidity");
  h3.innerHTML = humidityMessage;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (temperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = temperature;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `  <div class="col">
        ${forecastDay.dt}
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="forecast-icon" id="day-icon" width="36"/>
        <div class="high">${forecastDay.temp.max} | <span class="low">${forecastDay.temp.min}</span></div>
    </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "bb0d4750adbaf8dd371419162d9174d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
