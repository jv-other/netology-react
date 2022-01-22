import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Компонент визуализации списка
 * 
 * @component
 * @prop {object} selectedUrl Выбранная запись
 * @prop {function} onSelect Callback выбора элемента в списке
 * @prop {string} dataUrl URL каталога с пользователями
 *   
 */
const List = ({ selectedUser, onSelect, dataUrl }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.fetch(dataUrl + "/users.json")
      .then(response => response.json())
      .then(json => setUsers(json))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <ul className="users-list list-group">
      {users?.map(item => (
        <li
          key={item.id}
          className={`list-group-item ${selectedUser?.id === item.id ? "active" : ""}`}
          onClick={() => onSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  ) : (
    <div className="spinner-border text-primary">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

List.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.number
  }),
  onSelect: PropTypes.func.isRequired,
  dataUrl: PropTypes.string
};

export default List;