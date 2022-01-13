import React from "react";
import PropTypes from "prop-types";
import { Step } from "./StepsRepository";

/**
 * Компонент визуализации таблицы тренировок
 * 
 * @param {steps} steps Список тренировок
 * @param {onEdit} onEdit Callback редактирования записи
 * @param {onRemove} onRemove Callback удаления записи 
 * @returns 
 */
const StepsTable = ({ steps, onEdit, onRemove }) => {
  return (
    <table className="steps-table">
      <thead>
        <tr>
          <th>Дата (ДД.ММ.ГГ)</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {steps.map(step => (
          <tr key={step.id}>
            <td>{step.date.toLocaleDateString()}</td>
            <td>{step.distance}</td>
            <td>
              <button onClick={() => onEdit(step.id)}>&#9998;</button>
              <button onClick={() => onRemove(step.id)}>&#10060;</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

StepsTable.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.instanceOf(Step)).isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default StepsTable;