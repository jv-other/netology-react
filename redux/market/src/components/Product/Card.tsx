import React from "react";
import { ProductProps, Product } from "../../types/product";

/**
 * Компонент визуализации изображения на карточке
 * 
 * @component
 * @prop {Product} item Данные товара 
 *  
 */
const Image = ({ item }: ProductProps) => (
  <div className="card-image-wrapper">
    <img className="card-image" src={item.imageUrl} alt={item.title} />
    {(0 < (item.discount || 0)) && (
      <span className="product-discount position-absolute">-{item.discount}%</span>
    )}
  </div>
);

// Стоимость с учетом скидки
const getSum = (product: Product) => {
  return product.discount ? (product.price * (100 - product.discount) / 100).toFixed(2) : product.price;
};

// Исходня цена если есть скидка
const getPrice = (product: Product) => {
  return product.discount ? product.price : null;
};

/**
 * Компонент визуализации цены товара
 * 
 * @component
 * @prop {Product} item Данные товара 
 * 
 */
const Price = ({ item }: ProductProps) => (
  <div className="d-flex flex-row">
    <span className="fw-bold">{getSum(item)}&nbsp;&#8381;</span>
    {
      (0 < (item.discount || 0)) &&
      <span className="text-decoration-line-through text-muted ms-2">
        {getPrice(item)}&nbsp;&#8381;
      </span>
    }
  </div>
);


/**
 * Компонент визуализации карточки товара
 * 
 * @component
 * @prop {Product} item Данные товара 
 *
 */
const Card = ({ item }: ProductProps) => {
  return (
    <div className="card border-0">
      <Image item={item} />
      <div className="card-body text-start">
        <Price item={item} />
        <a href="#" className="card-link">{item.title}</a>
      </div>
    </div>
  );
};

export default Card;