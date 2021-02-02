//Hour
let now = new Date();

let h2 = document.querySelector("#current-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();



h2.innerHTML = `Mon Jan ${date}, ${hours}:00, 2050`;













//Search:
function displayWeatherCondition(response) {
  //City Search
  document.querySelector("#city").innerHTML = response.data.name;

  //Current Temperature
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  //Wind Speed
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;

  //Weather Description
  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  currentWeatherDescription.innerHTML = response.data.weather[0].main;

  //Humidity
  document.querySelector(
    "#humidity-level"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  //Max/Min Temperature
  let maxTemp = document.querySelector("#daily-max-temp");
  let minTemp = document.querySelector("#daily-min-temp");

  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;

  //Icon Description
  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//Forecast (Not working)
function showForecast(response) {
  let apiKey = "1c18b94f5da8d0385e2fadd0a1a97437";
  let city = document.querySelector("#city-input").value;
  let apiUrl2 = `pro.openweathermap.org/data/2.5/forecast/hourly?id=${city}&appid=${apiKey}`;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function showForecast(response) {
  console.log(response.data);

  let forecast = null;

  for (let i = 0; i < 5; i++) {
    forecast = response.data.list[i];
    let avgTemp = document.querySelector(`strong.temp${i}`);
    avgTemp.innerHTML = `${Math.round(response.data.list[i].main.temp)}°`;
    console.log(avgTemp);

    let newDate = response.data.list[i].dt_txt;

    let time = document.querySelector(`h5.dayOfWeek${i}`);

    time.innerHTML = forecastTime(newDate);

    console.log(time);

    console.log(forecast);
  }

  newCelsiusTemp0 = response.data.list[0].main.temp;
  newCelsiusTemp1 = response.data.list[1].main.temp;
  newCelsiusTemp2 = response.data.list[2].main.temp;
  newCelsiusTemp3 = response.data.list[3].main.temp;
  newCelsiusTemp4 = response.data.list[4].main.temp;

  let icon0 = document.querySelector("img.image0");
  icon0.setAttribute(
    "src",
    `images/${response.data.list[0].weather[0].main}.png`
  );
  let icon1 = document.querySelector("img.image1");
  icon1.setAttribute(
    "src",
    `images/${response.data.list[1].weather[0].main}.png`
  );
  let icon2 = document.querySelector("img.image2");
  icon2.setAttribute(
    "src",
    `images/${response.data.list[2].weather[0].main}.png`
  );
  let icon3 = document.querySelector("img.image3");
  icon3.setAttribute(
    "src",
    `images/${response.data.list[3].weather[0].main}.png`
  );
  let icon4 = document.querySelector("img.image4");
  icon4.setAttribute(
    "src",
    `images/${response.data.list[4].weather[0].main}.png`
  );
}

//City Input + API
function search(event) {
  event.preventDefault();
  let apiKey = "1c18b94f5da8d0385e2fadd0a1a97437";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiUrl2).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Celsius & Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
