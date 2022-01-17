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

    const item = items.find(i => form.name === i.name);
    item
      ? (item.timezoneOffset = parseInt(form.timezoneOffset))
      : items.push({ name: form.name, timezoneOffset: parseInt(form.timezoneOffset) });

    setForm({ name: "", timezoneOffset: "" });
    setItems([...items]);
  };

  const handleRemove = (clockName) => {
    items.splice(items.findIndex(i => clockName === i.name), 1);
    setItems([...items]);
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
        {items.map((item, index) => (
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