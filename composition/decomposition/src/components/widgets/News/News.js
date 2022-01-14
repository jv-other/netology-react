import React, { useState } from "react";
import Widget from "../../common/Widget/Widget";
import Nav, { NavItem } from "../../common/Nav/Nav";
import Link from "../../common/Link/Link";

import "./News.css";

// набор данных для примера
import NEWS_DATA from "./news-data_ru.json";

/**
 * Виджет - Новости
 * 
 * @returns 
 */
const News = () => {
  const [active, setActive] = useState(Object.keys(NEWS_DATA)[0]);

  const handleSelect = (evt) => evt.target.dataset.id && setActive(evt.target.dataset.id);

  return (
    <Widget className="widget-news">
      <Nav className="nav-news" onSelect={handleSelect}>
        {Object.keys(NEWS_DATA).map((section, index) => (
          <NavItem
            key={index}
            id={section}
            className="news-section"
            active={active === section}
          >
            {section}
          </NavItem>
        ))}
        <li className="news-datetime">
          <span className="nav-link disabled">
            {new Date().toLocaleString("ru-ru", {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </li>
      </Nav>

      <ul className="widget-content news-list nav flex-column">
        {NEWS_DATA[active] && NEWS_DATA[active].map(item => (
          <li key={item.id} className="news-item">
            <Link {...item} />
          </li>
        ))}
      </ul>

    </Widget>
  );
};

export default News;