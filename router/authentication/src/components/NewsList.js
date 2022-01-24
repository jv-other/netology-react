import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import NewItem from "./NewItem";

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
          <NewItem data={item} />
        </NavLink>
      ))
    }
  </>
);

NewsList.propTypes = {
  data: PropTypes.arrayOf(NewItem.propTypes.data)
}

export default NewsList;