import React from "react";
import PropTypes from "prop-types";

import "./Link.css";

/**
 * Компонент ссылки
 * 
 * @param {url} url href ссылки
 * @param {title} title title ссылки
 * @param {icon} icon url иконки
 * @param {text} text текст ссылки
 * @returns 
 */
const Link = ({ url, title = "", icon = "", text = "" }) => {

  const i = icon && (
    <span key="icon" className="link-icon" style={{ backgroundImage: `url(${icon})` }}><i></i></span>
  );
  const t = text && (<span key="text" className="link-text">{text}</span>);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
      {i}{t}
    </a>
  );
};
Link.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string
}

export default Link;