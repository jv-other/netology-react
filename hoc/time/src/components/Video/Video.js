import React from "react";
import PropTypes from "prop-types";
import DateTime from "../DateTime/DateTime";

/**
 * Компонент визуализации видео
 * 
 * @component
 * @prop {string} url URL видео
 * @prop {React.ComponentType} DateComponent Компонент визуализации даты добавления
 *  
 */
const Video = ({ url, date, DateComponent = DateTime }) => (
  <div className="video">
    <iframe
      src={url}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen={true}
    />
    {/* <DateTime date={date} /> */}
    <DateComponent date={date} />
  </div>
);

Video.propTypes = {
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  DateComponent: PropTypes.elementType
}

export default Video;