/*Initializing all the views*/

//User input data field//
var seachFormEl = document.querySelector("#user-input");

//City Current day results
var baseURL = "https://api.openweathermap.org/data/2.5/";
var apiKey = "72f6387e5dde063322536334ce16cefd";
var currentCityTemEl = document.querySelector("#temp");
var currentCityWindEl = document.querySelector("#wind");
var currentCityHumEl = document.querySelector("#hum");
var currentCityUvEl = document.querySelector("#uv");
var searchBtnEl = document.querySelector("#search");
var cityNameEl = document.querySelector("#city-name");
var weatherIcon1 = document.querySelector("weather-icon-1");
var lon;
var lat;
var cityName;
var currentDate;

//Day 1
var futureDate1 = document.querySelector("#date-1");
var futureWindEl1 = document.querySelector("#fut-wind-1");
var futureTemEl1 = document.querySelector("#fut-temp-1");
var futureHumEl1 = document.querySelector("#fut-hum-1");
//Day 2
var futureDate2 = document.querySelector("#date-2");
var futureWindEl2 = document.querySelector("#fut-wind-2");
var futureTemEl2 = document.querySelector("#fut-temp-2");
var futureHumEl2 = document.querySelector("#fut-hum-2");
//Day 3
var futureDate3 = document.querySelector("#date-3");
var futureWindEl3 = document.querySelector("#fut-wind-3");
var futureTemEl3 = document.querySelector("#fut-temp-3");
var futureHumEl3 = document.querySelector("#fut-hum-3");
//Day 4
var futureDate4 = document.querySelector("#date-4");
var futureWindEl4 = document.querySelector("#fut-wind-4");
var futureTemEl4 = document.querySelector("#fut-temp-4");
var futureHumEl4 = document.querySelector("#fut-hum-4");
//Day 5
var futureDate5 = document.querySelector("#date-5");
var futureWindEl5 = document.querySelector("#fut-wind-5");
var futureTemEl5 = document.querySelector("#fut-temp-5");
var futureHumEl5 = document.querySelector("#fut-hum-5");

//Creating a new span element for searched City
var cityContainerEl = document.getElementById("#city-btns");
var searchedSpanEl = document.getElementById("#city-searched");

//Getting current date and the next five days
currentDate = moment();
var currentDateFormatted = moment(currentDate).format('L');
var day1= moment(currentDate).add(1,'days').format('L');
var day2= moment(currentDate).add(2,'days').format('L');
var day3= moment(currentDate).add(3,'days').format('L');
var day4= moment(currentDate).add(4,'days').format('L');
var day5= moment(currentDate).add(5,'days').format('L');

var currentDateEl = document.querySelector("#current-date");

//setting click listner on search button
searchBtnEl.addEventListener("click", () => {
  getCityInfo();

});

  //Setting city name to the search list div
  currentCityUvEl.style.backgroundColor = "#50C878";
//Making an API Call after URL is formated to get city info
function getCityInfo() {
  //getting user input
  cityName = seachFormEl.value.trim();

  if (!cityName) {
    alert("Please enter a valid city name");
  } else {
      //Creating an element
 var newCityName = document.createElement('span');
 newCityName.textContent = cityName;
 cityContainerEl.appendChild(newCityName);

    //Formatting URL with city name on it.
    var apiUrl = baseURL + "weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          // console.log(data);
          currentDateEl.textContent= "(" + currentDateFormatted + ")";
          currentCityTemEl.textContent = data.main.temp + ' °F';
          currentCityHumEl.textContent = data.main.humidity + '%';
          currentCityWindEl.textContent = data.wind.speed  + ' MPH';
          cityNameEl.textContent = data.name;

          //Getting Coordinates
          lon = data.coord.lon;
          lat = data.coord.lat;

          getWeatherUvIndex();

        });
      }
    });
  }
}

//getting UV index of a current day
function getWeatherUvIndex() {
  //Api call to get forecast for the next five days
  var apiUrl = baseURL + "onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //adding Uv index value
        currentCityUvEl.textContent = data.current.uvi;
        
        //Loop to get the rest of the days
        for (var i = 0; i < data.daily.length; i++) {
          var weatherIcon1 = document.querySelector("#weather-icon-1");
          weatherIcon1.style.backgroundImage = "url(http://openweathermap.org/img/wn/10d@2x.png";
          //+ data.daily[0].weather.icon+ '.png'+">";
          futureDate1.textContent = "(" + day1 +")";
          futureWindEl1.textContent = data.daily[0].wind_speed  + ' MPH';
          futureHumEl1.textContent = data.daily[0].humidity + ' %'
          futureTemEl1.textContent = data.daily[0].temp.max + ' °F';


          var weatherIcon2 = document.querySelector("#weather-icon-2");
          weatherIcon2.style.backgroundImage = "url(http://openweathermap.org/img/wn/10d@2x.png";
          // + data.daily[1].weather.icon + '.png'+">";
          futureDate1.textContent = "(" + day1 +")";
          futureDate2.textContent = "(" + day2+")";
          futureWindEl2.textContent = data.daily[1].wind_speed + ' MPH'
          futureHumEl2.textContent = data.daily[1].humidity + ' %';
          futureTemEl2.textContent = data.daily[1].temp.max + ' °F';

          
          var weatherIcon3 = document.querySelector("#weather-icon-3");
          weatherIcon3.style.backgroundImage = "url(http://openweathermap.org/img/wn/10d@2x.png";
          //+ data.daily[2].weather.icon + "@2x.png')";
          futureDate3.textContent = "(" + day3+")";
          futureWindEl3.textContent = data.daily[2].wind_speed  + ' MPH';
          futureHumEl3.textContent = data.daily[2].humidity + ' %'
          futureTemEl3.textContent = data.daily[2].temp.max + ' °F';

          var weatherIcon4 = document.querySelector("#weather-icon-4");
          weatherIcon4.style.backgroundImage = "url(http://openweathermap.org/img/wn/10d@2x.png"; 
          //+ data.daily[3].weather.icon + '.png'+">";
          futureDate4.textContent = "(" + day4 +")";
          futureWindEl4.textContent = data.daily[3].wind_speed + ' MPH';
          futureHumEl4.textContent = data.daily[3].humidity + ' %';
          futureTemEl4.textContent = data.daily[3].temp.max + ' °F';

          var weatherIcon5 = document.querySelector("#weather-icon-5");
          weatherIcon5.style.backgroundImage = "url(http://openweathermap.org/img/wn/10d@2x.png";
          // + data.daily[4].weather.icon + '.png'+">";
          futureDate5.textContent = "(" + day5 +")";
          futureWindEl5.textContent = data.daily[4].wind_speed  + ' MPH';
          futureHumEl5.textContent = data.daily[4].humidity + ' %';
          futureTemEl5.textContent = data.daily[4].temp.max + ' °F';
        }
      });
    }
  });

}

