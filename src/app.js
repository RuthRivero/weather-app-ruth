let now = new Date();
let date = now.getDate();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let day = days[now.getDate() - 1];
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
