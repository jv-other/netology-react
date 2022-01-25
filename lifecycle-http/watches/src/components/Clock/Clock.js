import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./Clock.css";

const calculateDegrees = (timezoneOffset) => {
  const current = new Date();
  return {
    seconds: current.getSeconds() * (360 / 60),
    minutes: current.getMinutes() * (360 / 60),
    hours: ((current.getHours() + (current.getTimezoneOffset() / 60) - timezoneOffset) % 12) * (360 / 12)
  };
};

/**
 * Компонент визуализации часов
 * 
 * @component
 * @prop {number} timezoneOffset Смещение временной зоны в часах
 * 
 */
const Clock = ({ timezoneOffset }) => {
  const [degrees, setDegrees] = useState(calculateDegrees(timezoneOffset));

  useEffect(() => {
    const timeout = setInterval(() => setDegrees(calculateDegrees(timezoneOffset)), 1000);
    return () => clearInterval(timeout);
  }, [ timezoneOffset ]);

  return (
    <div className="clock">
      <div className="arrow seconds" style={{ transform: `rotate(${degrees.seconds}deg)` }}></div>
      <div className="arrow minutes" style={{ transform: `rotate(${degrees.minutes}deg)` }}></div>
      <div className="arrow hours" style={{ transform: `rotate(${degrees.hours}deg)` }}></div>
    </div>
  );
};

Clock.propTypes = {
  /** Смещение временной зоны в часах */
  timezoneOffset: PropTypes.number.isRequired
}

export default Clock;