import React from "react";
import { useSelector } from "react-redux";

import { productsSelector } from "../../store";

import Card from "./Card";

/**
 * Компонент визуализации списка товаров
 * @component
 * 
 */
const List = () => {
  const products = useSelector(productsSelector);

  return (
    <div className="row row-cols-3">
      {products.map(product => (
        <div key={product.id} className="col">
          <Card item={product} />
        </div>
      ))}
    </div>
  );
};

export default List;