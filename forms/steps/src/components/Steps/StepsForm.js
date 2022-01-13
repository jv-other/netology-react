import React, { useState } from "react";
import PropTypes from "prop-types";
import { Step } from "./StepsRepository";

const stepToForm = step => ({
  id: step.id,
  date: step.date.toISOString().substring(0, 10),
  distance: step.distance
});

/**
 * Форма ввода/редактирования данных тренировки
 * 
 * @param {onSubmit} onSubmit Callback сохранения данных
 * @param {step} step Данные для редактирования тренировки
 * @returns 
 */
const StepsForm = ({ onSubmit, step = null }) => {
  const [form, setForm] = useState({
    id: null,
    date: "",
    distance: 0
  });

  step && (step.id !== form.id) && setForm(stepToForm(step));

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(new Step(form.id, new Date(form.date), parseFloat(form.distance)));
    setForm({ date: "", distance: 0, id: null });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="steps-add-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="steps-input-date">Дата (ДД.ММ.ГГ)</label>
        <input
          id="steps-input-date"
          name="date"
          type="date"
          onChange={handleChange}
          value={form.date}
          min="2000-01-01"
          max={new Date().toISOString().substring(0, 10)}
          required={true}
          readOnly={!!form.id}
        />
      </div>
      <div className="form-field">
        <label htmlFor="steps-input-distance">Пройдено км</label>
        <input
          id="steps-input-distance"
          name="distance"
          type="number"
          onChange={handleChange}
          value={form.distance}
          min="0.01"
          step="0.01"
          required={true}
        />
      </div>
      <div className="form-field">
        <button>OK</button>
      </div>
    </form>
  );

};

StepsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.instanceOf(Step)
};

export default StepsForm;