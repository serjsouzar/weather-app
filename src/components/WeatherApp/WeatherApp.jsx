import React, { useState } from "react";
import "./styles.css";

import search_icon from "../../assets/search.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import clear_icon from "../../assets/clear.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";

const WeatherApp = () => {
  const api_key = process.env.REACT_APP_OPEN_WEATHER_KEY;

  const [humidity, setHumidity] = useState("64");
  const [wind, setWind] = useState("18");
  const [city, setCity] = useState("London");
  const [temp, setTemp] = useState("25");
  const [weather, setWeather] = useState("Clear");
  const [wicon, setWicon] = useState(clear_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    const response = await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setCity(data.name);
        setTemp(data.main.temp);
        setWeather(data.weather.main);
      });

    return response;
  };

  /**
   *   weather === "Rain"
      ? setWicon(rain_icon)
      : weather === "Clear"
      ? setWicon(clear_icon)
      : weather === "Clouds"
      ? setWicon(cloud_icon)
      : weather === "Snow"
      ? setWicon(snow_icon)
      : weather === "Drizzle"
      ? setWicon(drizzle_icon)
      : "";
   */
  

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search city" />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{temp}°c</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
