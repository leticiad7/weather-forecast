//Hour and Date 
let now = new Date();

    let h2 = document.querySelector("#current-date");
    let h3 = document.querySelector("#current-time");
    
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let year = now.getFullYear();


    let days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday","Friday","Saturday","Sunday"];
    let day = days[now.getDay()];

    let months = ["January", 
    "February",
    "March",
    "April", 
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];

    let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date}, ${year}`;
h3.innerHTML = `${hours}:${minutes}`

//
//Search:
function displayWeatherCondition(response) {
    //City Search
    document.querySelector("#city").innerHTML = response.data.name;
  
    //Current Temperature
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    
    //Conversion
  celsiusTemperature = response.data.main.temp;
  
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
  
    maxTemp.innerHTML = `Max Temperature: ${Math.round(response.data.main.temp_max)}°`;
    minTemp.innerHTML = `Min Temperature:${Math.round(response.data.main.temp_min)}°`;
  
    //Icon Description
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  
  //City Input + API
  function search(event) {
    event.preventDefault();
    let apiKey = "1c18b94f5da8d0385e2fadd0a1a97437";
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
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
  let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
};

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}



  
