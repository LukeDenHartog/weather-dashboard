let currentCity = 'Atlanta'
let currentDate = '(9/13/2022)';
var weatherAPIKey = "ccd960f728362c855d666700bf7fb5df";
var city;

currentCityDisplay = document.getElementById('current-city-conditions');
currentCityDisplay.textContent = `${currentCity} ` + `${currentDate}`;


userInputArea = document.getElementById('inputValue');
searchButton = document.querySelector('.search-button');
console.log(searchButton);

searchButton.addEventlistener("click", captureUserInput);

lol = fetch();
console.log();

let currentCityTemp = 25;

const currentTempDisplay = document.getElementById('current-temp');

let currentTemp = `Temp: ${currentCityTemp}°F`;

currentTempDisplay.textContent = currentTemp;



let currentCityWinds = 8.43;

const currentWindsDisplay = document.getElementById('current-winds');

let currentWinds = `Wind: ${currentCityWinds} MPH`;

currentWindsDisplay.textContent = currentWinds;


let currentCityHumidity = 44;

const currentHumidityDisplay = document.getElementById('current-humidity');

let currentHumidity = `Temp: ${currentCityHumidity} %`;

currentHumidityDisplay.textContent = currentHumidity;


