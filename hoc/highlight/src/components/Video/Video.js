import React from 'react';
import PropTypes from "prop-types";

const Video = ({ url, views }) => (
  <div className="item item-video">
    <iframe src={url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
    <p className="views">Просмотров: {views}</p>
  </div>
);

Video.propTypes = {
  url: PropTypes.string,
  views: PropTypes.number
}

// Условие отображения компонента
Video.withCondition = ({ type }) => "video" === type;

export default Video;