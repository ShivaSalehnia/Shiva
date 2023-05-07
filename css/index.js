function showCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city-name");
  let newTitle = document.querySelector("#change-city");
  newTitle.innerHTML = cityInput.value;
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showRealInformation);
}

function showRealInformation(response) {
  let temperature = document.querySelector("#old-number");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  celeciusTemp = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}

function getForcast(coordinates) {
  let apiKey2 = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey2}&units=metric`;
  axios.get(`${apiUrl1}`).then(displayForcast);
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
let minute = now.getMinutes();
let newDate = document.querySelector("#day-time");
if (minute < 10) {
  minute = `0${minute}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}

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

function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForcast(response) {
  let forecast = response.data.daily;

  let forcastElement = document.querySelector("#weather-forcast");
  let forcastHTML = `<div class="row">`;
  forecast.forEach(function (forcastDay, index) {
    if (index > 1 && index < 7) {
      forcastHTML =
        forcastHTML +
        `
            <div class="card border-light mb-sm-2" style="max-width: 7rem">
              <div class="card-header">${formatDay(forcastDay.dt)}</div>
              <div class="card-body">
                <h5 class="card-title-1">
                <span class="maxDegree">${Math.round(
                  forcastDay.temp.max
                )}° </span>
                <span class="minDegree">${Math.round(
                  forcastDay.temp.min
                )}°</span>
                </h5>
              </div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forcastDay.weather[0].icon
                }@2x.png"
                class="card-img-bottom"
                alt="..."
              />
            </div>`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
