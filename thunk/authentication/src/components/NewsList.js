import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import NewsItem from "./NewsItem";

/**
 * Компонент визуализации ленты новостей
 * @component
 * 
 */
const NewsList = ({ data }) => (
  <>
    {
      data?.map((item) => (
        <NavLink key={item.id} to={`/news/${item.id}`} className="news-item-link">
          <NewsItem data={item} />
        </NavLink>
      ))
    }
  </>
);

NewsList.propTypes = {
  data: PropTypes.arrayOf(NewsItem.propTypes.data)
}

export default NewsList;