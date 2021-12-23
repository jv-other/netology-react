/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CardsView from "./CardsView";
import ListView from "./ListView";
import "./Store.css";

// Переключение между типами расположения товаров
const IconSwitch = ({ icon, onSwitch }) => (
  <button className="icon-switch" onClick={onSwitch}>
    <span className="material-icons">{icon}</span>
  </button>
);

// Типы расположения товаров
const STORE_VIEWS = [{
  icon: "view_list",
  render: data => (<ListView items={data} />)
}, {
  icon: "view_module",
  render: data => (<CardsView cards={data} />)
}];

/**
 * Компонент визуализации товаров магазина
 * 
 * @param products Список данных товарров магазина 
 * @returns 
 */
const Store = ({ products }) => {

  const [view, setView] = useState(1);

  return (
    <div className="store">
      <div className="toolbar">
        <IconSwitch
          icon={STORE_VIEWS[(view + 1) % STORE_VIEWS.length].icon}
          onSwitch={() => setView((view + 1) % STORE_VIEWS.length)}
        />
      </div>
      {STORE_VIEWS[view].render(products)}
    </div>
  );
};

export default Store;