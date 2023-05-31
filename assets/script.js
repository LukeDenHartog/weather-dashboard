var city;
var cityChoice;
var cityName;
currentCityDisplay = document.getElementById('current-city-conditions');
userInputArea = document.getElementById('inputValue');
searchButton = document.querySelector('.search-button');
tempCard = document.getElementById("temp-card");
var currentTempDisplay = document.getElementById('current-temp');
const currentWindsDisplay = document.getElementById('current-winds');
const currentHumidityDisplay = document.getElementById('current-humidity');
greyLineSelector = document.querySelector('.grey-line');
const searchHistory = document.createElement("button");
searchButton.addEventListener('submit', citySearch);
let searchHistoryDiv = document.getElementById("button-container");
searchHistoryButtons = document.querySelector(".statebutton")
searchHistoryDiv.innerHTML = "";
var weatherAPIKey = "ccd960f728362c855d666700bf7fb5df";

function citySearch(event, words) {
    event.preventDefault();
    inputValue = userInputArea.value;
    words = inputValue.split(" ");
    //This line splits the item string into an array of words using the space character as the separator. For example, if the item is "new york," it will create an array words with two elements: ["new", "york"].
    if (words.length > 1) {
        capitalText = words[0].charAt(0).toUpperCase() + words[0].slice(1) + " " + words[1].charAt(0).toUpperCase() + words[1].slice(1);
    } else { // the slice method is a JavaScript string method used to extract a portion of a string and return it as a new string
        capitalText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    }
    cityChoice = capitalText;
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityChoice + '&limit=1&appid=ccd960f728362c855d666700bf7fb5df')
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (data) {
                    apiObject = data;
                    apiLat = apiObject[0].lat;
                    apiLon = apiObject[0].lon;

                    // Store currentCity in local storage
                    let currentCity = cityChoice;
                    localStorage.setItem('currentCity', currentCity);

                    callCurrentWeather();
                    callFiveDayForecast();
                    createSearchHistoryButton()
                    searchButtonCreation()
                })
            } else {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function callFiveDayForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${apiLat}&lon=${apiLon}&appid=ccd960f728362c855d666700bf7fb5df&units=imperial`)
        .then(function (rep) {
            if (rep.ok) {
                return rep.json().then(function (fiveDayForecastData) {
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
            } else { // If unsuccessful, throw an error
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
        })
}

function callCurrentWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +
        apiLat + '&lon=' + apiLon + '&appid=ccd960f728362c855d666700bf7fb5df&units=imperial')
        .then(function (res) {
            if (res.ok) {
                return res.json().then(function (weatherData) {
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
                    currentCityDisplay.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherDataObject.weather[0].icon}@2x.png">${currentCity} ` + `(${formattedDate}) <img src="https://openweathermap.org/img/wn/${weatherDataObject.weather[0].icon}@2x.png">`;

                });
            } else { // If unsuccessful, throw an error
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
        });
}

let searchHistoryArray = JSON.parse(localStorage.getItem("myArrayKey"));

if (!searchHistoryArray) {
    searchHistoryArray = [];
}

function createSearchHistoryButton() {
    let searchHistoryParse = localStorage.getItem("currentCity");

    if (!searchHistoryArray.includes(searchHistoryParse)) { // The exclamation point before searchHistoryArray is a logical NOT operator. This checks if the array does not include the value of searchHistoryParse. The includes() method returns true if the specified value is found in the array, and false otherwise. By adding the logical NOT operator !, we invert the boolean value returned by includes() so that true becomes false and false becomes true.
        searchHistoryArray.push(searchHistoryParse);
        // Convert the array to a JSON string
        const myArrayString = JSON.stringify(searchHistoryArray);
        // Save the JSON string to local storage
        localStorage.setItem("myArrayKey", myArrayString);
        previouslySearchedCities = localStorage.getItem("myArrayKey");

        if (searchHistoryArray.length > 8) {
            searchHistoryArray.splice(0, 1); // delete the first item in the array
        }
    }
}

let existingValues = [];

function searchButtonCreation() {
    searchHistoryArray.forEach(function (item) {
        // Check if a button with the same text content already exists
        var buttonText = item.charAt(0).toUpperCase() + item.slice(1); // capitalize first letter of text
        var existingButton = Array.from(searchHistoryDiv.getElementsByTagName("button")).find(function (button) {

            //searchHistoryDiv.getElementsByTagName("button") retrieves all HTML elements within the searchHistoryDiv element that have the tag name "button". This returns an HTMLCollection (a live collection of elements).

            // Array.from(...) converts the HTMLCollection to an array. This step is necessary because the HTMLCollection does not have array methods like find. By converting it to an array, we can use array methods on it.

            // .find(function(button) { ... }) uses the find method to search for a specific button within the array. The find method executes the provided function once for each element in the array until it finds a button that satisfies the condition specified in the function.

            // function(button) is the function passed as an argument to find. It takes an individual button element from the array as a parameter and performs a condition check.

            return button.textContent.toLowerCase() === buttonText.toLowerCase();
        });

        if (existingButton) {
            return; // Skip creating the button
        } //if the function finds the array inside of the HTMLCollection it will not continue executing the rest of the function.

        button = document.createElement("button");
        button.textContent = buttonText;
        button.classList.add("stateButton"); // add class to button element
        searchHistoryDiv.appendChild(button);

        button.addEventListener("click", function (eventbuttonText) {
            let buttonText = this.textContent; // retrieve text content of button element
            userInputArea.value = buttonText;
            console.log(buttonText);
            citySearch(eventbuttonText);
        });
        existingValues.push(item);
        console.log(item);
    });
}

searchButtonCreation();