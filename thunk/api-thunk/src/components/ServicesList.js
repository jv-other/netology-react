import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { RequestStatuses as statuses } from "../store/requestStatuses";
import { getServices, removeService } from "../api/servicesApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Компонент визуализации записи об услуге
 * 
 * @component
 * @prop {object} item Запись об услуге
 * @prop {object} state Состояние запроса на удаление 
 * @prop {function} onEdit Callback редактирования элемента
 * @prop {function} onRemove Callback удаления элемента
 *  
 */
const ServicesItem = ({ item, state, onEdit, onRemove }) => (
  <li className="list-group-item d-flex flex-row align-items-center">
    <div className={`col-${statuses.FAILURE !== state?.status ? 10 : 5}`}>
      <span className="me-1">{item.name}:</span>
      <span>{item.price}&nbsp;руб.</span>
    </div>
    {(statuses.FAILURE === state?.status) && (
      <div className="col-5">
        <div className="alert alert-danger mb-0 p-1 mx-2">
          {state.error}
        </div>
      </div>
    )}
    <div className="col-1">
      {![statuses.PENDING, statuses.SUCCESS].includes(state?.status) && (
        <button className="btn btn-danger" onClick={() => onEdit(item.id)}>&#9998;</button>
      )}
    </div>
    <div className="col-1">
      <button
        className="btn btn-danger"
        disabled={[statuses.PENDING, statuses.SUCCESS].includes(state?.status)}
        onClick={() => onRemove(item.id)}
      >
        {statuses.PENDING === state?.status ? (<div className="spinner-border" />) : (<>&#10006;</>)}
      </button>
    </div>
  </li>
);

ServicesItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    price: PropTypes.number
  }),
  state: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

/**
 * Список записей об услугах
 * 
 * @component
 *  
 */
const ServicesList = () => {
  // состояние списка
  const listState = useSelector(state => state.list);
  // наличие успешно выполненных запросов на удаление
  const needRefresh = useSelector(state =>
    Object.values(state.list.removeRequests).map(r => r.status).includes(statuses.SUCCESS));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // загрузка/обновление записей
  useEffect(() => {
    dispatch(getServices());
  }, [needRefresh]);

  // форма редактирования
  const handleEdit = (serviceId) => {
    navigate("/services/" + serviceId);
  };

  // запрос на удаление
  const handleRemove = (serviceId) => {
    dispatch(removeService(serviceId));
  };

  return (
    <ul className="list-group">
      {/* если загрузка */}
      {(statuses.PENDING === listState.loading) && (
        <li className="list-group-item text-center">
          <div className="spinner-border text-danger">
            <span className="visually-hidden">Loading...</span>
          </div>
        </li>
      )}
      {/* если ошибка загрузки */}
      {(statuses.FAILURE === listState.loading) && (
        <li className="list-group-item text-center">
          <div className="alert alert-danger mb-0">
            {listState.error}
          </div>
        </li>
      )}
      {/* список записей */}
      {listState.items.map(item => (
        <ServicesItem
          key={item.id}
          item={item}
          state={listState.removeRequests[item.id]}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
};

ServicesList.propTypes = {
  data: PropTypes.arrayOf(
    ServicesItem.propTypes.item
  )
}

export default ServicesList;