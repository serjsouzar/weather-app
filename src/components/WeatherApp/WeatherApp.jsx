import React, { useState } from 'react'
import './styles.css'

import search_icon from '../../assets/search.png'
import cloud_icon from '../../assets/cloud.png'
import humidity_icon from '../../assets/humidity.png'
import wind_icon from '../../assets/wind.png'

const WeatherApp = () => {

  const api_key = process.env.REACT_APP_OPEN_WEATHER_KEY

  const [humidity, setHumidity] = useState("64")
  const [wind, setWind] = useState("18")
  const [city, setCity] = useState("London")
  const [temp, setTemp] = useState("25")


  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value === ""){
      return 0
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    const response = await fetch(url)
    .then((data) => data.json())
    .then((data) => {
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCity(data.name)
      setTemp(data.main.temp)
    })
    
    return response
  }


  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='Search city'/>
        <div className='search-icon' onClick={() => search()}>
        <img src={search_icon} alt=''/>
        </div>
      </div>
      <div className='weather-image'>
        <img src={cloud_icon} alt=''/>
      </div>
      <div className='weather-temp'>{temp}°c</div>
      <div className='weather-location'>{city}</div>
      <div className='data-container'>
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className='data'>
            <div className='wind-rate'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp