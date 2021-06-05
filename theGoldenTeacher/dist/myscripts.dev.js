"use strict";

var RecentSearches = [];
var inputBtn = document.getElementById("neonbtn");
var ulEl = document.getElementById("all");
var input = "";
var currentDate = moment().format("dddd, MMMM Do YYYY");
console.log(currentDate);
document.getElementById('neonbtn').addEventListener("click", function () {
  input = document.getElementById("input").value;
  input.trim();
  RecentSearches.push(input);
  RecentSearches.reverse();
  RecentSearches.splice(5);
  localStorage.setItem("RecentSearches", JSON.stringify(RecentSearches));
  getWeatherData();
});

function renderSearch() {
  var listItems = "";

  for (var _i = 0; _i < RecentSearches.length; _i++) {
    listItems += '<h4>' + RecentSearches[_i] + '</h4>';
    ulEl.innerHTML = listItems;
  }

  ;
}

;

var getWeatherData = function getWeatherData() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=722ee3ab29754a08dbb548a3673860d1&units=imperial').then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    var displayAreaEl = document.querySelector('.main-search');
    displayAreaEl.innerHTML = '<h2>' + response.name + ", " + currentDate + '<h2>' + '<h3>' + "Temp: " + response.main.temp + "°F" + '<h3>' + '<h3>' + "Humidity: " + response.main.humidity + "%" + '<h3>' + '<h3>' + "Wind: " + response.wind.speed + " Mph" + '<h3>';
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    return fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=722ee3ab29754a08dbb548a3673860d1&units=imperial');
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    var futureWeatherEl = document.querySelector('.futureWeather');

    for (i = 1; i < response.daily.length; i++) {
      var futureDay = response.daily[i];
      var futureDate = moment.unix(futureDay.dt).format("dddd, MMMM Do");
      var futureItem = document.createElement('div');
      futureItem.setAttribute('class', 'future-item');
      futureItem.innerHTML += "<h3> ".concat(futureDate, " </h3>");
      futureItem.innerHTML += "<h3><i class= fas fa-thermometer-half></i> Temp:".concat(futureDay.temp.day, "</h3>");
      futureItem.innerHTML += "<h3><i class=\"fas fa-wind\"></i> Wind: ".concat(futureDay.wind_speed, "</h3>");
      futureItem.innerHTML += "<h3><i class=\"fas fa-tint\"></i> Humidity: ".concat(futureDay.humidity, "</h3>");
      futureWeatherEl.appendChild(futureItem);
    }
  });
};