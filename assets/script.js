
let currentDate = '(Use the time API)';
var weatherAPIKey = "ccd960f728362c855d666700bf7fb5df";
var city;

currentCityDisplay = document.getElementById('current-city-conditions');


userInputArea = document.getElementById('inputValue');
searchButton = document.querySelector('.search-button');


var cityChoice;



atlantaButton = document.querySelector('.atlanta-button');
atlantaButton.addEventListener('click', atlantaSearch);

function atlantaSearch() {
    inputElement.value = "Atlanta";
}
denverButton = document.querySelector('.denver-button');
denverButton.addEventListener('click', denverSearch);

function denverSearch() {
    inputElement.value = "Denver";
}

seattleButton = document.querySelector('.seattle-button');
seattleButton.addEventListener('click', seattleSearch);

function seattleSearch() {
    inputElement.value = "Seattle";
}

sanfranciscoButton = document.querySelector('.sanfrancisco-button');
sanfranciscoButton.addEventListener('click', sanfranciscoSearch);

function sanfranciscoSearch() {
    inputElement.value = "San Francisco";
}
orlandoButton = document.querySelector('.orlando-button');
orlandoButton.addEventListener('click', orlandoSearch);

function orlandoSearch() {
    inputElement.value = "Orlando";
}

newyorkButton = document.querySelector('.newyork-button');
newyorkButton.addEventListener('click', newyorkSearch);

function newyorkSearch() {
    inputElement.value = "New York";
}

chicagoButton = document.querySelector('.chicago-button');
chicagoButton.addEventListener('click', chicagoSearch);

function chicagoSearch() {
    inputElement.value = "Chicago";
}

austinButton = document.querySelector('.austin-button');
austinButton.addEventListener('click', austinSearch);

function austinSearch() {
    inputElement.value = "Austin";
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
         callFiveDayForecast()
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
function callFiveDayForecast() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + apiLat +'&lon=' + apiLon + '&appid=ccd960f728362c855d666700bf7fb5df')
    .then(function(rep){
        if(rep.ok) {
            return rep.json().then(function(fiveDayForecastData) {
                console.log(fiveDayForecastData);
                fiveDayForecastDataObject = fiveDayForecastData;
  

                while (tempCard.firstChild) {
                  tempCard.removeChild(tempCard.firstChild);
                }


                for (let i = 0; i < 5; i++) {
                    const item = fiveDayForecastDataObject.list[i];
                    const container = document.createElement("div");
                    container.classList.add("temp-humidity");
                    const temp = document.createElement("p");
                    temp.textContent = `Temp: ${item.main.temp}`;
                    container.appendChild(temp);
                    const humidity = document.createElement("p");
                    humidity.textContent = `Humidity: ${item.main.humidity}`;
                    container.appendChild(humidity);
                    tempCard.appendChild(container);
                }
            })     
        } else {  // If unsuccessful, throw an error
            throw new Error('Error ' + response.status + ': ' + response.statusText);
          }
    })
  }
 
  

    tempCard = document.getElementById("temp-card");



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
            let currentHumidity = `Humidity: ${currentCityHumidity} %`;
            currentHumidityDisplay.textContent = currentHumidity;

            //Displays the current city that has been searched
            let currentCity = weatherDataObject.name;  
            currentCityDisplay.textContent = `${currentCity} ` + `${currentDate}`;
            
        });
    } else {  // If unsuccessful, throw an error
        throw new Error('Error ' + response.status + ': ' + response.statusText);
      }
    }); 
} 




var currentTempDisplay = document.getElementById('current-temp');







const currentWindsDisplay = document.getElementById('current-winds');






const currentHumidityDisplay = document.getElementById('current-humidity');




