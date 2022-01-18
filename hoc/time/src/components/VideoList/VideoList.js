import React from "react";
import PropTypes from "prop-types";
import Video from "../Video/Video";

/**
 * Компонент визуализации списка видео
 * 
 * @component
 * @param {Object[]} list Список видео
 * @param {React.ComponentType} VideoComponent Компонент визуализации записи видео
 *  
 */
const VideoList = ({ list, VideoComponent = Video }) => (
  <>
    {list.map((item, index) => (
      <VideoComponent {...item} key={index} />
    ))}
  </>
);

VideoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })),
  VideoComponent: PropTypes.elementType
};

export default VideoList;