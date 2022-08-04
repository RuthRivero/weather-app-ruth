let now = new Date();
let date = now.getDate();
let days = ["Sunday", "Monday", "Tuesday", "Friday", "Saturday"];

let day = days[now.getDate()];
let hours = now.getHours();
let minutes = now.getMinutes();
let temperature;

let todayDate = document.querySelector("#day-time");
todayDate.innerHTML = `${day}, ${hours}:${minutes}`;

function showTemperature(response) {
  temperature = Math.round(response.data.main.temp);
  let message = `${temperature} °C | °F`;
  let h2 = document.querySelector("#current-temperature");
  h2.innerHTML = message;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = city.toUpperCase();
  let apiKey = "bb0d4750adbaf8dd371419162d9174d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
