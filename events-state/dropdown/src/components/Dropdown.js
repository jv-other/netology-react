/* eslint-disable react/prop-types */
import React, { useState } from "react";

/**
 * Элемент выпадающего меню
 * 
 * @param item Элемент
 * @param selected Признак того, что элемент выбран
 * @param onSelectItem Обработчик выбора элемента
 * @returns 
 */
const DropdownItem = ({ item, selected, onSelectItem }) => (
  <li className={selected ? "active" : null} onClick={() => onSelectItem(item)}>
    <a href="#">{item}</a>
  </li>
);

/**
 * Компонент списка
 * 
 * @param items - Список элементов 
 * @returns 
 */
const DropdownList = ({ items }) => {
  const [selected, setSelected] = useState(null);

  const onSelectItem = item => setSelected(item);

  return (
    <ul className="dropdown">
      {
        items.map(item => (
          <DropdownItem
            item={item}
            selected={selected == item}
            onSelectItem={onSelectItem}
            key={item}
          />
        ))
      }
    </ul>
  );
};

/**
 * Выпадающий список с кнопкой
 * 
 * @param items Список элементов 
 * @returns 
 */
const Dropdown = ({ items }) => {
  const [opened, setOpened] = useState(false);

  const toggleDropdown = () => setOpened(!opened);

  return (
    <div className={["dropdown-wrapper", opened && "open"].filter(i => i).join(" ")}>
      <button className="btn" onClick={toggleDropdown}>
        <span>Account settings</span>
        <span className="material-icons">public</span>
      </button>
      <DropdownList items={items} />
    </div>
  );
};

export default Dropdown;