import React from "react";
import PropTypes from "prop-types";

const Star = () => (
  <svg fill="#D3BCA2" height="28" viewBox="0 0 18 18" width="28" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z" />
    <path d="M0 0h18v18H0z" fill="none" />
  </svg>
);

/**
 * Рейтинг фильма
 * 
 * @param count Целое число [1..5] 
 * @returns 
 */
const Stars = ({ count }) => (
  Number.isInteger(count) && (0 < count) && (6 > count) && (
    <ul className="card-body-stars u-clearfix">
      {[...Array(count).keys()].map(i => (<Star key={i} />))}
    </ul>
  )
);

Stars.propTypes = {
  count: PropTypes.number
};

export default Stars;