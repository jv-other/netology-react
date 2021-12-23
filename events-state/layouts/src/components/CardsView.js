/* eslint-disable react/prop-types */
import React from "react";

/**
 * Компонент визуализации карточки товара
 * 
 * @param card Данные товара 
 * @returns 
 */
const ShopCard = ({ card }) => {
  const { name, price, color, img } = card;

  return (
    <>
      <div className="product-title">{name}</div>
      <div className="product-color">{color}</div>
      <div className="product-img">
        <img src={img} alt={name} />
      </div>
      <div className="product-purchase-info">
        <div className="product-price">&#x24;{price}</div>
        <button className="product-purchase-btn">Add to cart</button>
      </div>
    </>
  );
};

/**
 * Компонент визуализации товаров в виде карточек
 * 
 * @param cards Массив с данными 
 * @returns 
 */
const CardsView = ({ cards }) => (
  <div className="cards-view">
    {
      cards.map((card, index) => (
        <div className="shop-card" key={"card-" + index}><ShopCard card={card} /></div>
      ))
    }
  </div>
);

export default CardsView;