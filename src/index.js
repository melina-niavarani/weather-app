let apiKey = "1bcc332eb77d8d56d5fa9270a4adc3a2";
let showSearchInput = false;
let celsiusDegree = null

let form = document.querySelector("#search-form");
let searchBtn = document.querySelector("#search-btn");
let h1 = document.querySelector("h1");
let currentTemp = document.querySelector("#temperature");
let description = document.querySelector("#description");
let highTemp = document.querySelector("#high");
let lowTemp = document.querySelector("#low");
let currentLoc = document.querySelector("#current-location");
let firstDay = document.querySelector("#firstDay");
let firstHigh = document.querySelector("#firstHigh");
let firstLow = document.querySelector("#firstLow");
let secondDay = document.querySelector("#secondDay");
let secondHigh = document.querySelector("#secondHigh");
let secondLow = document.querySelector("#secondLow");
let thirdDay = document.querySelector("#thirdDay");
let thirdHigh = document.querySelector("#thirdHigh");
let thirdLow = document.querySelector("#thirdLow");
let fourthDay = document.querySelector("#fourthDay");
let fourthHigh = document.querySelector("#fourthHigh");
let fourthLow = document.querySelector("#fourthLow");
let fifthDay = document.querySelector("#fifthDay");
let fifthHigh = document.querySelector("#fifthHigh");
let fifthLow = document.querySelector("#fifthLow");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");

let icon1 = document.querySelector("#icon1");
let icon2 = document.querySelector("#icon2");
let icon3 = document.querySelector("#icon3");
let icon4 = document.querySelector("#icon4");
let icon5 = document.querySelector("#icon5");
let icon6 = document.querySelector("#icon6");


let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

let now = new Date();
firstDay.innerHTML = days[now.getDay() + 1];
secondDay.innerHTML = days[now.getDay() + 2];
thirdDay.innerHTML = days[now.getDay() + 3];
fourthDay.innerHTML = days[now.getDay() + 4];
fifthDay.innerHTML = days[now.getDay() + 5];

searchBtn.addEventListener("click", function () {
  showSearchInput = !showSearchInput;
  if (showSearchInput) {
    form.innerHTML = `<input id="search-area" class="border border-4 border-dark-subtle rounded-pill placeholder-sm p-2 mt-2 mb-4 w-75" type="search"  placeholder="Search">`;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let searchInput = document.querySelector("#search-area");
      h1.innerHTML =
        searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(importWeather);
    });
  }
});

function sevenDayForecast(response) {
  firstHigh.innerHTML = `${Math.floor(response.data.list[0].main.temp_max)}°C `;
  firstLow.innerHTML = `${Math.floor(response.data.list[0].main.temp_min)}°C `;
  secondHigh.innerHTML = `${Math.floor(response.data.list[1].main.temp_max)}°C `;
  secondLow.innerHTML = `${Math.floor(response.data.list[1].main.temp_min)}°C `;
  thirdHigh.innerHTML = `${Math.floor(response.data.list[2].main.temp_max)}°C `;
  thirdLow.innerHTML = `${Math.floor(response.data.list[2].main.temp_min)}°C `;
  fourthHigh.innerHTML = `${Math.floor(response.data.list[3].main.temp_max)}°C `;
  fourthLow.innerHTML = `${Math.floor(response.data.list[3].main.temp_min)}°C `;
  fifthHigh.innerHTML = `${Math.floor(response.data.list[4].main.temp_max)}°C `;
  fifthLow.innerHTML = `${Math.floor(response.data.list[4].main.temp_min)}°C `;
  icon2.setAttribute(
    "src",
     `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  )
  icon3.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`
  );
  icon4.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`
  );
  icon5.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`
  );
  icon6.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@2x.png`
  );
}


function importWeather(response) {
  celsiusDegree = response.data.main.temp
  currentTemp.innerHTML = `${Math.floor(response.data.main.temp)}`;
  description.innerHTML = response.data.weather[0].description;
  highTemp.innerHTML = `${Math.floor(response.data.main.temp_max)}°C `;
  lowTemp.innerHTML = ` ${Math.floor(response.data.main.temp_min)}°C `;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`
  wind.innerHTML = `Wind: ${response.data.wind.speed}`
  icon1.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  let daysApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(daysApiUrl).then(sevenDayForecast);
}

function importWeatherByLocation(response){
  h1.innerText = response.data.name;
  celsiusDegree = response.data.main.temp
  currentTemp.innerHTML = `${Math.floor(response.data.main.temp)}`;
  description.innerHTML = response.data.weather[0].description;
  highTemp.innerHTML = `${Math.floor(response.data.main.temp_max)}°C `;
  lowTemp.innerHTML = ` ${Math.floor(response.data.main.temp_min)}°C `;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`
  wind.innerHTML = `Wind: ${response.data.wind.speed}`
  icon1.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
}

function currentLocation(location) {
  let lat = location.coords.latitude;
  let long = location.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(importWeatherByLocation);

  let daysApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(daysApiUrl).then(sevenDayForecast);
}

function changeToCurrent() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

currentLoc.addEventListener("click", changeToCurrent);

let fahrenheitLink = document.querySelector("#fahrenheit-link")
let celsiusLink = document.querySelector('#celsius-link')

fahrenheitLink.addEventListener('click', function(event){
  event.preventDefault()
  let fahrenheit = Math.round((celsiusDegree * 9) / 5 + 32)
  currentTemp.innerHTML = fahrenheit
  celsiusLink.classList.remove("active")
  fahrenheitLink.classList.add("active")
})
celsiusLink.addEventListener('click', function (event) {
  event.preventDefault()
  currentTemp.innerHTML = Math.round(celsiusDegree)
  celsiusLink.classList.add("active")
  fahrenheitLink.classList.remove("active")
})

