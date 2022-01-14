import React from "react";
import Widget from "../../common/Widget/Widget";

import "./Weather.css";

// набор данных для примера
import WEATHER_DATA from "./weather-data_ru.json";

/**
 * Виджет - Погода
 * 
 * @returns 
 */
const Weather = () => (
  <Widget title={WEATHER_DATA.title} url="#" className="widget-weather col-4">
    <div className="weather-content">
      <span className="weather-image" style={{ backgroundImage: `url(${WEATHER_DATA.image})` }}></span>
      <span className="weather-value">{WEATHER_DATA.value}</span>
      <span className="weather-details">{WEATHER_DATA.details}</span>
    </div>
  </Widget>
);

export default Weather;