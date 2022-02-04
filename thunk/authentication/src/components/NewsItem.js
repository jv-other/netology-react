import React from "react";
import PropTypes from "prop-types";

/**
 * Компонент визуализации новости
 * @component
 * 
 * @prop {object} data Данные новости 
 * 
 */
const NewsItem = ({ data }) => (
  <div className="col">
    <div className="card">
      <img src={data?.image} className="card-img-top" alt={data?.title} />
      <div className="card-body">
        <h5 className="card-title">{data?.title}</h5>
        <p className="card-text">{data?.content}</p>
      </div>
    </div>
  </div>
);

NewsItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
  })
};

export default NewsItem;