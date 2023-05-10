var weatherAPIKey = "ccd960f728362c855d666700bf7fb5df";
var city;

currentCityDisplay = document.getElementById('current-city-conditions');


userInputArea = document.getElementById('inputValue');
searchButton = document.querySelector('.search-button');

var cityChoice;
var cityName;
searchButton.addEventListener('submit', citySearch);


function citySearch(event, buttonText) {
  event.preventDefault();
  cityChoice = buttonText || cityName || userInputArea.value;
  fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityChoice + '&limit=1&appid=ccd960f728362c855d666700bf7fb5df')
  .then(function(response) {
    if (response.ok) {
      return response.json().then(function(data) {
        apiObject = data;
        apiLat = apiObject[0].lat;
        apiLon = apiObject[0].lon;
        
        // Store currentCity in local storage
        let currentCity = cityChoice;
        localStorage.setItem('currentCity', currentCity);
        
      
  
        callCurrentWeather();
        callFiveDayForecast();
        createSearchHistoryButton()
        displaySearchHistoryButtons()
      })
    } else {
      throw new Error('Error ' + response.status + ': ' + response.statusText);
    }
  })
  .catch(function(error) {
    console.error(error);
  });
}

function callFiveDayForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${apiLat}&lon=${apiLon}&appid=ccd960f728362c855d666700bf7fb5df&units=imperial`)
    .then(function(rep){
        if(rep.ok) {
            return rep.json().then(function(fiveDayForecastData) {
                console.log(fiveDayForecastData);
                fiveDayForecastDataObject = fiveDayForecastData;

            tempCard.textContent = "";

                for (let i = 4; i < 40; i = i + 8) {
                    const item = fiveDayForecastDataObject.list[i];
                    const container = document.createElement("div");
                    const fiveDayDate = document.createElement("h3");
                    fiveDayDate.textContent = dayjs.unix(item.dt).format("MM/DD/YYYY");
                    container.appendChild(fiveDayDate);
                    const image = document.createElement("img")
                    image.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                    container.appendChild(image);
                    container.classList.add("temp-humidity");
                    const temp = document.createElement("p");
                    temp.textContent = `Temp: ${item.main.temp}`;
                    container.appendChild(temp);
                    const fiveDayWind = document.createElement("p");
                    fiveDayWind.textContent = `Wind: ${item.wind.speed}`;
                    container.appendChild(fiveDayWind);
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
     + apiLat + '&lon=' + apiLon + '&appid=ccd960f728362c855d666700bf7fb5df&units=imperial')
     .then(function(res){
        if (res.ok) {
        return res.json().then(function(weatherData) {
            // console.log(weatherData)
            weatherDataObject = weatherData;

        //This displays the current selected cities temp
           kelvinTemp = weatherDataObject.main.temp;
           let currentCityTemp = kelvinTemp
            let currentTemp = `Temp: ${currentCityTemp}°F`;
            currentTempDisplay.textContent = currentTemp;


            // Wind Speed output here
            windSpeedVelocity = weatherDataObject.wind.speed;
            let currentWinds = `Wind: ${windSpeedVelocity} MPH`;
            currentWindsDisplay.textContent = currentWinds;

            currentCityHumidity = weatherDataObject.main.humidity;
            let currentHumidity = `Humidity: ${currentCityHumidity} %`;
            currentHumidityDisplay.textContent = currentHumidity;
            console.log(weatherDataObject)
            //Displays the current city that has been searched
            let currentCity = weatherDataObject.name;
            let formattedDate = dayjs.unix(weatherDataObject.dt).format('MM/DD/YYYY')
            currentCityDisplay.innerHTML = `${currentCity} ` + `(${formattedDate}) <img src="https://openweathermap.org/img/wn/${weatherDataObject.weather[0].icon}@2x.png">`;
            
        
        });
    } else {  // If unsuccessful, throw an error
        throw new Error('Error ' + response.status + ': ' + response.statusText);
      }
    }); 
  }

var currentTempDisplay = document.getElementById('current-temp');

const currentWindsDisplay = document.getElementById('current-winds');

const currentHumidityDisplay = document.getElementById('current-humidity');


greyLineSelector = document.querySelector('.grey-line');
const searchHistory = document.createElement("button");



let searchHistoryArray = [];
 

function createSearchHistoryButton() {
  let searchHistoryParse = localStorage.getItem("currentCity");
  
  if (!searchHistoryArray.includes(searchHistoryParse)) { // The exclamation point before searchHistoryArray is a logical NOT operator. This checks if the array does not include the value of searchHistoryParse. The includes() method returns true if the specified value is found in the array, and false otherwise. By adding the logical NOT operator !, we invert the boolean value returned by includes() so that true becomes false and false becomes true.
    searchHistoryArray.push(searchHistoryParse);
    console.log(searchHistoryArray)

    if (searchHistoryArray.length > 8) {
      searchHistoryArray.splice(0, 1); // delete the first item in the array
    }
  }
}



function displaySearchHistoryButtons() {
  let searchHistoryDiv = document.getElementById("button-container");

  // Clear the previous search history buttons
  searchHistoryDiv.innerHTML = "";

  // Loop through the search history array and create a button for each item
  searchHistoryArray.forEach(function(item) {

    let button = document.createElement("button");
    button.textContent = item.charAt(0).toUpperCase() + item.slice(1); // capitalize first letter of text
    button.classList.add("stateButton"); // add class to button element
    searchHistoryDiv.appendChild(button);
    
    
button.addEventListener("click", function(eventbuttonText) {

  let buttonText = this.textContent; // retrieve text content of button element
  userInputArea.value = buttonText;
  console.log(buttonText); // log text content to console (replace with your own code)
  citySearch(eventbuttonText);
  searchHistoryButtons = document.querySelector(".statebutton")
  
});    
  });
}




