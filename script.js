'use strict'

    const URL = "https://api.openweathermap.org/data/2.5/weather?lat=63.09&lon=21.610&units=metric&appid=b102d81092eef4a28e509bfe54a92a4d";
    async function makeAPICall(){
const result = await fetch(URL)
result.json().then(data => {
const temperature = data.main.temp;


console.log(`It's ${temperature} °C in Vaasa`)})

document.getElementById("weather").innerHTML = temperature;

    }



    makeAPICall();



    //const mainTemp = document.getElementById('WeatherDiv').innerHTML = JSON.stringify(temperature);
    //const divWeather = document.createElement("divWeather");
    //divWeather.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
 

    //var div = document.createElement("div");
    //div.innerHTML = tempp2;

    //weatherFetch.appendChild(div);
    //var weatherFetch = document.getElementById("weather");
