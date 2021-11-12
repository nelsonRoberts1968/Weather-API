/*Initializing all the views*/

//User input data field//
var seachFormEl = document.querySelector("#user-input");

//City Current day results
var baseURL = "https://api.openweathermap.org/data/2.5/";
var apiKey ="72f6387e5dde063322536334ce16cefd";
var currentCityTemEl = document.querySelector("#temp");
var currentCityWindEl = document.querySelector("#wind");
var currentCityHumEl =document.querySelector("#hum");
var currentCityUvEl = document.querySelector("#uv");
var searchBtnEl = document.querySelector("#search");
var cityNameEl= document.querySelector("#city-name")
var lon;
var lat;

 //Day 1
var futureWindEl1 = document.querySelector("#fut-wind-1");
var futureTemEl1= document.querySelector("#fut-temp-1");
var futureHumEl1 = document.querySelector("#fut-hum-1");
//Day 2
var futureWindEl2 = document.querySelector("#fut-wind-2");
var futureTemEl2= document.querySelector("#fut-temp-2");
var futureHumEl2 = document.querySelector("#fut-hum-2");
//Day 3
var futureWindEl3 = document.querySelector("#fut-wind-3");
var futureTemEl3= document.querySelector("#fut-temp-3");
var futureHumEl3 = document.querySelector("#fut-hum-3");
//Day 4
var futureWindEl4 = document.querySelector("#fut-wind-4");
var futureTemEl4= document.querySelector("#fut-temp-4");
var futureHumEl4 = document.querySelector("#fut-hum-4");
//Day 5
var futureWindEl5 = document.querySelector("#fut-wind-5");
var futureTemEl5= document.querySelector("#fut-temp-5");
var futureHumEl5= document.querySelector("#fut-hum-5");

//setting click listner on search button
searchBtnEl.addEventListener("click",()=>{
    getCityInfo();
    //getWeatherUvIndex();
});
currentCityUvEl.style.backgroundColor ="#50C878"

//Making an API Call after URL is formated to get city info
function getCityInfo(){
    //getting user input
    var cityName = seachFormEl.value.trim();

if(!cityName){
    alert("Please enter a valid city name");
 }else{
     
//Formatting URL with city name on it.
var apiUrl = baseURL+ "weather?q=" + cityName + "&appid=" + apiKey
  fetch(apiUrl)
  .then(function(response){
      if(response.ok){
        console.log(response);
        response.json().then(function(data){
        // console.log(data);
         currentCityTemEl.textContent= data.main.temp;
         currentCityHumEl.textContent= data.main.humidity;
         currentCityWindEl.textContent=data.wind.speed;
         cityNameEl.textContent= data.name;

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
function getWeatherUvIndex(){
    //Api call to get forecast for the next five days
    var apiUrl = baseURL + "onecall?lat=" +lat + "&lon="+ lon + "&appid="+ apiKey;
    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
            
             //adding Uv index value
             currentCityUvEl.textContent= data.current.uvi;
            

             //Loop to get the rest of the days
               for (var i = 0;  i < data.daily.length; i++){

                futureWindEl1.textContent= data.daily[0].wind_speed;
                futureHumEl1.textContent= data.daily[0].humidity;
                futureTemEl1.textContent= data.daily[0].temp.max;

                futureWindEl2.textContent= data.daily[1].wind_speed;
                futureHumEl2.textContent= data.daily[1].humidity;
                futureTemEl2.textContent= data.daily[1].temp.max;

                futureWindEl3.textContent= data.daily[2].wind_speed;
                futureHumEl3.textContent= data.daily[2].humidity;
                futureTemEl3.textContent= data.daily[2].temp.max;

                futureWindEl4.textContent= data.daily[3].wind_speed;
                futureHumEl4.textContent= data.daily[3].humidity;
                futureTemEl4.textContent= data.daily[3].temp.max;


                futureWindEl5.textContent= data.daily[4].wind_speed;
                futureHumEl5.textContent= data.daily[4].humidity;
                futureTemEl5.textContent= data.daily[4].temp.max;
               console.log(data.daily[4].temp.max);
                   
               }
            });
        }

    });
}
 
// //getting 5 days wether forecast.
// //https://api.openweathermap.org/data/2.5/forecast/daily?q=sacramento&cnt=5&appid=72f6387e5dde063322536334ce16cefd
// //https://api.openweathermap.org/data/2.5/forecast/daily?q=sacramento&cnt=5&appid=72f6387e5dde063322536334ce16cefd
// //api.openweathermap.org/data/2.5/forecast/daily?q=sacramento&units=metric&cnt=7&appid=72f6387e5dde063322536334ce16cefd
// //https://api.openweathermap.org/data/2.5/onecall?lat=38.5816&lon=121.4944&appid=72f6387e5dde063322536334ce16cefd
// function getFutureForecast(){
//     var apiUrl = baseurl + "onecall="+cityName+ "&cnt=5" +"&appid="+ apiKey;
//     fetch(apiUrl)
//     .then(function(response){
//         if(response.ok){
//             response.json().then(function(data){
//                 //adding Uv index value
//             });
//         }
//     });
// };



