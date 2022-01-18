import React from "react";
import PropTypes from "prop-types";

/**
 * Компонент визуализации даты публикации
 * 
 * @component
 * @param {string} date Строка даты публикации 
 *  
 */
const DateTime = ({ date }) => (
  <p className="date">{date}</p>
);

DateTime.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateTime;