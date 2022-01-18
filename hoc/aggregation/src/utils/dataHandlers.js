import React from "react";
import PropTypes from "prop-types";

/**
 * Конвертация записей
 * 
 * @param {object[]} data Массив данных 
 * @param {function} mapper Функция конвертер
 * @returns {object[]} Сконвертированные данные
 */
const mapHandler = (data, mapper) => data.map(mapper);

/**
 * Агрегация данных
 * 
 * @param {object[]} data Массив данных 
 * @param {function} operator Функция агрегации
 * @returns {object} Резальтат агрегации
 */
const aggHandler = (data, operator) => data.reduce((acc, item) => (
  { ...acc, [item[0]]: operator(acc[item[0]], item[1]) }
), {});

/**
 * Конвертация объекта в массив данных
 * 
 * @param {object} data Объект
 * @param {string} key Свойство записи в которое будет сохранено значение ключа 
 * @param {string} val Свойство записи в которое будет сохранено значение 
 * @returns {object[]} Массив данных
 */
const arrHandler = (data, key, val) => Object.entries(data).map(e => ({ [key]: e[0], [val]: e[1] }));

/**
 * Сортировка массива данных
 * 
 * @param {object[]} data Массив данных
 * @param {string} prop Значение свойства, по которому осуществляется сортировка 
 * @returns {object[]} Отсортированный массив
 */
const sortHandler = (data, prop) => data.sort((a, b) => (
  a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0
));

/**
 * Обертка вызова обработчика данных
 * 
 * @param {function} handler Функция обработчик 
 * @param  {...any} args Аргументы обработчика
 * @returns {function} Функция вызова обработчика с аргументами
 */
const withHandler = (handler, ...args) => (data) => handler(data, ...args);

/**
 * Формирует функцию, вызывающую обработчики по цепочке
 * 
 * @param {function[]} list Массив обработчиков
 * @returns {function} Скомбинированная функция
 */
const withHandlerChain = list => list.reduce((res, handler) => (data) => handler(res(data)));

// PropTypes для HOC
const dataHandlerComponentPropTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Формирует компонент с вызовом обработчика данных
 * 
 * @param {React.ComponentType} Component Исходный компонент 
 * @param {function} dataHandler Функция обработки данных 
 * @returns {React.ComponentType} HOC
 */
const withDataHandler = (Component, dataHandler) => {
  const WithDataHandlerComponent = (props) => (
    <Component {...props} list={dataHandler(props.list)} />
  );
  WithDataHandlerComponent.propTypes = dataHandlerComponentPropTypes;
  return WithDataHandlerComponent;
}

export {
  withDataHandler, withHandlerChain, withHandler, sortHandler, arrHandler, aggHandler, mapHandler
};