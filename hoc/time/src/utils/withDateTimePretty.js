import React from "react";
import PropTypes from "prop-types";

const MINUTE_MS = 60 * 1000,
  HOUR_MS = 60 * MINUTE_MS,
  DAY_MS = 24 * HOUR_MS;

const MINUTES_AGO = "минут назад",
  HOURS_AGO = "часов назад",
  DAYS_AGO = "дней назад";

const UNITS_AGO = [
  // [ лимит, делитель, окончание ]
  [HOUR_MS, MINUTE_MS, MINUTES_AGO],
  [DAY_MS, HOUR_MS, HOURS_AGO],
  [Number.MAX_VALUE, DAY_MS, DAYS_AGO]
];

/**
 * Декоратор с преобразованием даты в строку "{количество} {времени} назад"
 * 
 * @function
 * @param {React.ComponentType} Component Компонент визуализации даты
 * @returns {React.ComponentType} Компонент с преобразованной датой
 */
const withDateTimePretty = (Component) => {
  const DateTimePretty = (props) => {
    const difference = new Date().getTime() - Date.parse(props.date);
    const unitsAgo = UNITS_AGO.find(i => difference < i[0]).slice(1, 3);

    return (
      <Component {...props} date={[Math.floor(difference / unitsAgo[0]), unitsAgo[1]].join(" ")} />
    );
  };
  DateTimePretty.propTypes = {
    date: PropTypes.string.isRequired
  }
  return DateTimePretty;
}

export default withDateTimePretty;