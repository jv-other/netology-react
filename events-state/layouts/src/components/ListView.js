/* eslint-disable react/prop-types */
import React from "react";

/**
 * Компонент визуализации элемента списка товаров
 * 
 * @param item Данные товара 
 * @returns 
 */
const ShopItem = ({ item }) => {
  const { name, price, color, img } = item;

  return (
    <>
      <div className="product-img">
        <img src={img} alt={name} />
      </div>
      <div className="product-title">{name}</div>
      <div className="product-color">{color}</div>
      <div className="product-price">&#x24;{price}</div>
      <div className="product-purchase-info">
        <button className="product-purchase-btn">Add to cart</button>
      </div>
    </>
  );
};

/**
 * Компонент визуализации товаров в виде списка
 * 
 * @param items Массив с данными 
 * @returns 
 */
const ListView = ({ items }) => (
  <ul className="list-view">
    {
      items.map((item, index) => (
        <li className="list-view-item" key={"item-" + index}><ShopItem item={item} /></li>
      ))
    }
  </ul>
);

export default ListView;