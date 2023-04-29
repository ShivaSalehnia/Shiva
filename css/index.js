function showCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city-name");
  let newTitle = document.querySelector("#change-city");
  newTitle.innerHTML = cityInput.value;
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showRealInformation);
  function showRealInformation(response) {
    let temperature = document.querySelector("#old-number");
    temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${Math.round(
      response.data.main.humidity
    )} %`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    let description = document.querySelector("#description");
    description.innerHTML = `${response.data.weather[0].description}`;
    celeciusTemp = Math.round(response.data.main.temp);
  }
}

let returnCityName = document.querySelector("#saving-city-name");
returnCityName.addEventListener("submit", showCityName);

let now = new Date();

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
let hour = now.getHours();
let minute = now.getUTCMinutes();
let newDate = document.querySelector("#day-time");
newDate.innerHTML = `${day} ${hour}:${minute}`;

function showFahrenheitTemprature(event) {
  event.preventDefault();
  let farenheit = (celeciusTemp * 9) / 5 + 32;
  realCelecius.classList.remove("active");
  realFarenheit.classList.add("active");
  showedNumber.innerHTML = Math.round(farenheit);
}
function showCeleciusTemperature(event) {
  event.preventDefault();
  realFarenheit.classList.remove("active");
  realCelecius.classList.add("active");
  showedNumber.innerHTML = Math.round(celeciusTemp);
}

let realCelecius = document.querySelector("#celecius-degrees");
let realFarenheit = document.querySelector("#farenheit-degrees");
let showedNumber = document.querySelector("#old-number");
let celeciusTemp = null;

realCelecius.addEventListener("click", showCeleciusTemperature);
realFarenheit.addEventListener("click", showFahrenheitTemprature);
