/* eslint-disable react/prop-types */
import React, { useState } from "react";

/**
 * Компонент для визуализации доступных фильтров
 * 
 * @param filters Список доступных фильтров 
 * @param selected Выбранный фильтр 
 * @param onSelectFilter Обработчик фильтрации 
 * @returns
 */
const Toolbar = ({ filters, selected, onSelectFilter }) => (
  <div className="toolbar">
    {
      filters.map((filter, index) => (
        <button
          className={(selected == filter) ? "selected-btn" : "toolbar-btn"}
          onClick={() => onSelectFilter(filter)}
          key={"tool-btn-" + index}
        >
          {filter}
        </button>
      ))
    }
  </div>
);

/**
 * Компонент для визуализации списка проектов
 * 
 * @param items Список проектов для отображения 
 * @returns 
 */
const ProjectList = ({ items }) => (
  <>
    {
      items.map(item => (
        <div className="portfolio-item" key={"item-" + item.id}>
          <img src={item.img} />
        </div>
      ))
    }
  </>
);

const ALL_ITEMS = "All";

/**
 * Компонент для визуализации портфолио
 * 
 * @param items Список 
 * @returns 
 */
const Portfolio = ({ items }) => {

  const list = items.map((item, index) => Object.assign({ id: index }, item));
  const filters = [ALL_ITEMS].concat(Array.from(new Set(items.map(item => item.category))));

  const [selected, setSelected] = useState(ALL_ITEMS);

  const onSelectFilter = filter => setSelected(filter);

  return (
    <div className="portfolio">
      <Toolbar filters={filters} selected={selected} onSelectFilter={onSelectFilter} />
      <ProjectList items={list.filter(item => (ALL_ITEMS == selected) || (selected == item.category))} />
    </div>
  );

};

export default Portfolio;