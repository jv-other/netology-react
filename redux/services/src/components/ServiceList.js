import React from "react";
import PropTypes from "prop-types";
import ServiceForm from "./ServiceForm";

/**
 * Компонент визуализации списка услуг
 * 
 * @component
 * @prop {object[]} items Список услуг
 * @prop {function} onEdit Callback редактирования записи
 * @prop {function} onRemove Callback удаления записи
 * 
 */
const ServiceList = ({ items = [], onEdit, onRemove }) => (
  <div className="card">
    <div className="card-header">Услуги</div>
    <ul className="card-body px-4">
      {items.map(item => (
        <li key={item.id} className="row border border-info rounded mb-2">
          <div className="col col-10 text-start p-2">
            {item.name}&nbsp;{item.price}
          </div>
          <div className="col col-2 d-flex justify-content-around">
            <button className="btn border-none" onClick={() => onEdit(item.id)}>&#9998;</button>
            <button className="btn border-none" onClick={() => onRemove(item.id)}>&#10060;</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

ServiceList.propTypes = {
  items: PropTypes.arrayOf(ServiceForm.propTypes.item),
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default ServiceList;