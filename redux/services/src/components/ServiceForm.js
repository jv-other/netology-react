import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const defaultState = { name: "", price: 0 };

/**
 * Форма редактирования/добавления услуги
 * 
 * @component
 * @prop {object} item Редактируемая запись
 * @prop {function} onSubmit Callback сохранения ввода
 * @prop {function} onCancel Callback отмены изменений 
 * 
 */
const ServiceForm = ({ item, onSubmit, onCancel }) => {
  const [form, setForm] = useState(defaultState);

  useEffect(() => {
    setForm(item || defaultState);
  }, [item]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(form);
    setForm(defaultState);
  };

  const handleChangeName = ({ target }) => {
    setForm(prevForm => ({ ...prevForm, "name": target.value }));
  };

  const handleChangePrice = ({ target }) => {
    setForm(prevForm => ({ ...prevForm, "price": parseInt(target.value) }));
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        {form.id ? "Редактировать" : "Добавить"}
      </div>
      <div className="card-body row">
        <div className="col col-5">
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChangeName}
            required
          />
        </div>
        <div className="col col-5">
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChangePrice}
            required
            min={1}
          />
        </div>
        <div className="col col-2 d-flex flex-row">
          <button type="submit" className="btn btn-primary flex-fill me-2">Save</button>
          {form.id && (
            <button
              type="button"
              className="btn btn-secondary flex-fill me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

ServiceForm.propTypes = {
  item: PropTypes.shape({
    /** Идентификатор записи */
    id: PropTypes.any,
    /** Название услуги */
    name: PropTypes.string.isRequired,
    /** Стоимость услуги */
    price: PropTypes.number.isRequired
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ServiceForm;