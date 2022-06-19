let today = new Date();
function formatDate(today) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[today.getDay()];

  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${weekday}, ${hour}:${minutes}`;
  return formattedDate;
}
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(today);

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-today");
  mainTemp.innerHTML = `${temp}°C`;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

function searchCity(event) {
  event.preventDefault();
  let units = "metric";
  let apiKey = "c88b70400da19a39ad34ae161f43c93f";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchBox = document.querySelector("#search-form");
searchBox.addEventListener("submit", searchCity);

function findPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c88b70400da19a39ad34ae161f43c93f";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function useNavigatorGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let greenButton = document.querySelector("#current-location");
greenButton.addEventListener("click", useNavigatorGeolocation);
