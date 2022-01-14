import React from "react";
import PropTypes from "prop-types";

import "./Banner.css";

/**
 * Компонент баннера
 * 
 * @param {url} url Ссылка для перехода
 * @returns 
 */
const Banner = ({ url, className, children }) => (
  <div className={`banner ${className}`}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </div>
);

Banner.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

export default Banner;