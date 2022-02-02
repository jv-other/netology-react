import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Product } from "../../types/product";
import * as ProductsActions from "../../store/productsSlice";


const EMPTY_DATA: Product = {
  title: "",
  description: "",
  imageUrl: "",
  price: 0,
  discount: 0
};

/**
 * Форма ввода данных о товаре
 * 
 * @component
 * 
 */
const Form = () => {
  const [data, setData] = useState<Product>(EMPTY_DATA);
  const dispatch = useDispatch();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dispatch(ProductsActions.save({
      ...data,
      price: parseFloat("" + data.price),
      discount: parseFloat("" + data.discount)
    }));
    setData(EMPTY_DATA);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">Добавить</div>
      <div className="card-body row">

        {/* Название товара */}
        <div className="col col-6 d-flex flex-column align-items-start mb-2">
          <label htmlFor="form-input-title" className="form-label">Название:</label>
          <input
            id="form-input-title"
            name="title"
            type="text"
            className="form-control"
            required
            value={data.title}
            onChange={handleChange}
          />
        </div>

        {/* Ссылка на изображение */}
        <div className="col col-6 d-flex flex-column align-items-start mb-2">
          <label htmlFor="form-input-imageUrl" className="form-label">Изображение:</label>
          <input
            id="form-input-imageUrl"
            name="imageUrl"
            type="text"
            className="form-control"
            required
            value={data.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Цена */}
        <div className="col col-6 d-flex flex-column align-items-start mb-2">
          <label htmlFor="form-input-price" className="form-label">Цена:</label>
          <input
            id="form-input-price"
            name="price"
            type="number"
            className="form-control"
            required
            min={1}
            value={data.price}
            onChange={handleChange}
          />
        </div>

        {/* Скидка */}
        <div className="col col-6 d-flex flex-column align-items-start mb-2">
          <label htmlFor="form-input-discount" className="form-label">Скидка:</label>
          <input
            id="form-input-discount"
            name="discount"
            type="number"
            className="form-control"
            min={0.00}
            max={99.99}
            value={data.discount}
            onChange={handleChange}
          />
        </div>

        {/* Описание */}
        <div className="col col-12 d-flex flex-column align-items-start mb-2">
          <label htmlFor="form-input-description" className="form-label">Описание:</label>
          <textarea
            id="form-input-description"
            name="description"
            className="form-control"
            value={data.description}
            onChange={handleChange}
          />
        </div>

        <div className="col col-2 mt-3">
          <button className="btn btn-primary w-100">Сохранить</button>
        </div>
      </div>
    </form>
  );
};

export default Form;