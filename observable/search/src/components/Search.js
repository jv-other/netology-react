import React from "react";
import { useDispatch, useSelector } from "react-redux";

import parse from "html-react-parser";

import { search, IDLE, PENDING, SUCCESS, FAILURE } from "../store/searchSlice";

/**
 * Компонент поиска
 * 
 * @component
 * 
 */
const Search = () => {
  const { state, query, items, error } = useSelector(state => state.search);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => dispatch(search({ query: target.value.trim() }));

  return (
    <>
      <input
        type="text"
        placeholder="Поиск"
        className="form-control mb-3"
        value={query}
        onChange={handleChange}
      />
      {
        // Поисковая строка пустая
        ((IDLE === state) && <div className="alert">Type something to search...</div>)
        // Ошибка запроса
        || ((FAILURE === state) && <div className="alert alert-danger">{error}</div>)
        // Запрос выполняется..
        || ((PENDING === state) && <div className="spinner-border text-success"></div>)
        // Запрос выполнен
        || ((SUCCESS === state) && (
          <ul className="list-group">
            {items.map(item => (
              <li key={item.id} className="list-group-item">
                <p>{parse(item.text)}</p>
              </li>
            ))}
          </ul>
        ))
      }
    </>
  );
};

export default Search;