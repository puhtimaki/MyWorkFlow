'use strict'

const URL =
  'https://api.openweathermap.org/data/2.5/weather?lat=63.09&lon=21.610&units=metric&appid=b102d81092eef4a28e509bfe54a92a4d'
async function makeAPICall() {
  const result = await fetch(URL)
  result.json().then((data) => {
    const temperature = data.main.temp
    document.getElementById(
      'apiweather',
    ).innerHTML = `It's ${temperature} °C in Vaasa`

    console.log(`It's ${temperature} °C in Vaasa`)
  })

  document.getElementById('weather').innerHTML = JSON.stringify(temperature)
}

makeAPICall()
