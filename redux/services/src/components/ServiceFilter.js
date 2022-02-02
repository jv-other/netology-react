import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByNameSelector } from "../store";

import * as Filters from "../store/filtersSlice";

/**
 * Фильтр записей по названию
 * 
 */
const ServiceFilter = () => {
  // Фильтр по названию
  const filter = useSelector(filterByNameSelector);
  const dispatch = useDispatch();

  // установить фильтр
  const handleChange = ({ target }) => {
    dispatch(Filters.filter(target.value));
  };

  // сброс фильтра
  const handleReset = () => {
    dispatch(Filters.filter(""));
  };

  return (
    <div className="card">
      <div className="card-header">Фильтр</div>
      <div className="card-body">
        <div className="input-group">
          <span className="input-group-text">Название</span>
          <input
            className="form-control"
            type="text"
            placeholder="Найти"
            value={filter}
            onChange={handleChange}
          />
          {filter && (
            <button
              className="btn btn-outline-secondary"
              onClick={handleReset}
            >
              &#10060;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceFilter;