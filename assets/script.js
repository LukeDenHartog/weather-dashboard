let currentCity = 'Atlanta'
let currentDate = '(9/13/2022)';
var weatherAPIKey = "ccd960f728362c855d666700bf7fb5df";
var city;

currentCityDisplay = document.getElementById('current-city-conditions');
currentCityDisplay.textContent = `${currentCity} ` + `${currentDate}`;


userInputArea = document.getElementById('inputValue');
searchButton = document.querySelector('.search-button');
console.log(searchButton);



console.log();



var cityChoice;





atlantaButton = document.querySelector('.atlanta-button');

atlantaButton.addEventListener('click', atlantaSearch);

function atlantaSearch() {
    inputElement.value = "atlanta";
}

var inputElement = document.getElementById("inputValue");
searchButton.addEventListener('click', citySearch);

function citySearch() {
  // Make a GET request to the API endpoint
  cityChoice = userInputArea.value;
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='
   + cityChoice + '&limit=1&appid=ccd960f728362c855d666700bf7fb5df')
   .then
  (function(response) {
    if (response.ok) {
      // If successful, parse the response data and store it in a variable
      return response.json().then(function(data) {
        console.log(data);
         apiObject = data;
         apiLat = apiObject[0].lat;
         apiLon = apiObject[0].lon;
         callCurrentWeather();
      })
    } else {
      // If unsuccessful, throw an error
      throw new Error('Error ' + response.status + ': ' + response.statusText);
    }
  })
  .catch(function(error) {
    console.error(error);
  });
}

    function callCurrentWeather(){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='
     + apiLat + '&lon=' + apiLon + '&appid=ccd960f728362c855d666700bf7fb5df')
     .then
     (function(res){
        if (res.ok) {
        return res.json().then(function(weatherData) {
            console.log(weatherData)
            weatherDataObject = weatherData;

        //This displays the current selected cities temp
           kelvinTemp = weatherDataObject.main.temp;
           let currentCityTemp = (kelvinTemp - 273.15) * 1.8 + 32;
            let currentTemp = `Temp: ${currentCityTemp}°F`;
            currentTempDisplay.textContent = currentTemp;


            // Wind Speed output here
            windSpeedVelocity = weatherDataObject.wind.speed;
            let currentWinds = `Wind: ${windSpeedVelocity} MPH`;
            currentWindsDisplay.textContent = currentWinds;

            currentCityHumidity = weatherDataObject.main.humidity;
            let currentHumidity = `Temp: ${currentCityHumidity} %`;
            currentHumidityDisplay.textContent = currentHumidity;
        });
    } else {  // If unsuccessful, throw an error
        throw new Error('Error ' + response.status + ': ' + response.statusText);
      }
    }); 
} 




var currentTempDisplay = document.getElementById('current-temp');







const currentWindsDisplay = document.getElementById('current-winds');






const currentHumidityDisplay = document.getElementById('current-humidity');




