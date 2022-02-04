import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { getService, saveService } from "../api/servicesApi";
import { RequestStatuses as statuses } from "../store/requestStatuses";
import { ActionCreators as actions } from "../store/servicesFormReducer";

const emptyData = { name: "", price: "", content: "" };

/**
 * Форма редактирования записи об услуге
 * 
 * @component
 *  
 */
const ServicesForm = () => {
  const { params } = useMatch("/services/:id");
  // состояние формы
  const state = useSelector(state => state.form);
  // локальные данные для изменения
  const [form, setForm] = useState(emptyData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // запрос на получение данных
  useEffect(() => {
    dispatch(getService(params.id));
  }, []);

  // установка данных из состояния
  useEffect(() => {
    setForm({ ...emptyData, ...state.item });
  }, [state.item]);

  // если запись сохранена - то переход к списку
  useEffect(() => {
    if (statuses.SUCCESS === state.saveStatus) {
      dispatch(actions.saveServiceReset());
      navigate("/services");
    }
  }, [state.saveStatus]);

  // обработчики...

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(saveService({ ...form, price: parseInt(form.price) }));
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleRefresh = () => {
    dispatch(getService(params.id));
  };

  // если состояние загрузки
  if (statuses.PENDING === state.fetchStatus) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-danger">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // если состояние ошибки получения данных
  if (statuses.FAILURE === state.fetchStatus) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger">
            {state.error}
          </div>
          <button className="btn btn-danger me-2" onClick={handleCancel}>Отмена</button>
          <button className="btn btn-danger" onClick={handleRefresh}>Обновить</button>
        </div>
      </div>
    );
  }

  // если в состоянии сохранения записи
  const savePending = (statuses.PENDING === state.saveStatus);

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="form-input-name" className="form-label">Название</label>
          <input
            id="form-input-name"
            name="name"
            type="text"
            className="form-control"
            required
            value={form.name}
            onChange={handleChange}
            disabled={savePending}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="form-input-price" className="form-label">Стоимость</label>
          <input
            id="form-input-price"
            name="price"
            type="number"
            className="form-control"
            required
            value={form.price}
            onChange={handleChange}
            disabled={savePending}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="form-input-content" className="form-label">Описание</label>
          <input
            id="form-input-content"
            name="content"
            type="text"
            className="form-control"
            required
            value={form.content}
            onChange={handleChange}
            disabled={savePending}
          />
        </div>
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={handleCancel}
          disabled={savePending}
        >
          Отмена
        </button>
        <button type="submit" className="btn btn-danger me-2" disabled={savePending}>
          {savePending ? <div className="spinner-border" /> : <>Сохранить</>}
        </button>
        {(statuses.FAILURE === state.saveStatus) && (
          <div className="alert alert-danger mb-0 d-inline py-2" style={{ top: "0.15rem" }}>
            {state.error}
          </div>
        )}
      </div>
    </form>
  );

};

ServicesForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  })
};

export default ServicesForm;