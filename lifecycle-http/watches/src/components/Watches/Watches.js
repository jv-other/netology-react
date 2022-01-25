import React, { useState } from "react";
import PropTypes from "prop-types";
import Clock from "../Clock/Clock";

/**
 * Компонент - список и форма ввода временных зон
 * 
 * @component
 * @prop {watches[]} watches Список временных зон
 * 
 */
const Watches = ({ watches = [] }) => {
  const [items, setItems] = useState(watches);
  const [form, setForm] = useState({ name: "", timezoneOffset: "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleAdd = (evt) => {
    evt.preventDefault();

    const index = (items.findIndex(item => form.name === item.name) + 1) || (items.length + 1);
    setItems([
      ...items.slice(0, index -1), 
      { name: form.name, timezoneOffset: parseInt(form.timezoneOffset) },
      ...items.slice(index)
    ]);

    setForm({ name: "", timezoneOffset: "" });
  };

  const handleRemove = (clockName) => {
    const newItems = items.filter(item => clockName !== item.name);
    setItems(newItems);
  };

  return (
    <div className="watches">
      <form className="watches-form" onSubmit={handleAdd}>
        <div className="form-field">
          <label htmlFor="input-name" className="form-label">Название</label>
          <input
            id="input-name"
            name="name"
            type="text"
            required={true}
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="input-tz" className="form-label">Временная зона</label>
          <input
            id="input-tz"
            name="timezoneOffset"
            type="number"
            required={true}
            min={-11}
            max={11}
            step={1}
            value={form.timezoneOffset}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <span className="form-label">&nbsp;</span>
          <button>Добавить</button>
        </div>
      </form>
      <div className="watches-list">
        {items.map(item => (
          <div key={item.name} className="watches-item">
            <div className="watches-title">
              {item.name}&nbsp;{`(${0 < item.timezoneOffset ? "+" : ""}${item.timezoneOffset}ч)`}
            </div>
            <span className="watches-remove" onClick={() => handleRemove(item.name)}>&#10006;</span>
            <Clock timezoneOffset={item.timezoneOffset} />
          </div>
        ))}
      </div>
    </div>
  );
};

Watches.propTypes = {
  watches: PropTypes.arrayOf(PropTypes.shape({
    /** Название временной зоны */
    name: PropTypes.string.isRequired,
    /** Смещение временной зоны в часах */
    timezoneOffset: PropTypes.number
  }))
}

export default Watches;