// let celsius = true;
let showSearchInput = false;
let form = document.querySelector("#search-form");
let searchBtn = document.querySelector("#search-btn");
let h1 = document.querySelector("h1");
let currentTemp = document.querySelector("#temperature");
let description = document.querySelector("#description");
let highTemp = document.querySelector("#high");
let lowTemp = document.querySelector("#low");
let currentLoc = document.querySelector("#current-location");

let apiKey = "1bcc332eb77d8d56d5fa9270a4adc3a2";

searchBtn.addEventListener("click", function () {
  showSearchInput = !showSearchInput;
  if (showSearchInput) {
    form.innerHTML = `<input id="search-area" class="border border-4 border-dark-subtle rounded-pill placeholder-sm p-2 mb-2 w-75" type="search"  placeholder="Search">`;
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

function importWeather(response) {
  console.log(response);
  currentTemp.innerHTML = `${Math.floor(response.data.main.temp)}°C`;
  description.innerHTML = response.data.weather[0].description;
  highTemp.innerHTML = `H: ${Math.floor(response.data.main.temp_max)}`;
  lowTemp.innerHTML = `L: ${Math.floor(response.data.main.temp_min)}`;
}

function currentLocation(location) {
  let lat = location.coords.latitude;
  let long = location.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    h1.innerText = response.data.name;
    currentTemp.innerHTML = Math.floor(response.data.main.temp);
    description.innerHTML = response.data.weather[0].description;
    highTemp.innerHTML = `H: ${Math.floor(response.data.main.temp_max)}`;
    lowTemp.innerHTML = `L: ${Math.floor(response.data.main.temp_min)}`;
  });
}
function changeToCurrent() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

currentLoc.addEventListener("click", changeToCurrent);

// function changeTempType() {
//   if (!celsius) {
//     let fahrenheitTemperature = Math.round((weather[h1.innerHTML].temp * 9) / 5 + 32)
//     currentTemp.innerHTML = `${fahrenheitTemperature}°F`;
//   }else {
//     currentTemp.innerHTML = `${weather[h1.innerHTML].temp}°C`
//   }
// }

// currentTemp.addEventListener('click', function(event){
//   event.preventDefault()
//   celsius = !celsius
//   changeTempType()
// })
