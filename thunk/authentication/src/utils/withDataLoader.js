import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import apiRequestThunk from "../thunks/apiRequestThunk";
import { complete } from "../store/requestsSlice";

const withDataLoaderPropTypes = {
  status: PropTypes.string,
  statusCode: PropTypes.number,
  errorMessage: PropTypes.string,
  data: PropTypes.any
};

/**
 * HOC. Оборачивает компонент загрузкой данных
 * 
 * @param {React.ComponentType} Component Оборачиваемый компонент
 * @param {string|function} path Значение или функция получения значения ресурса 
 * @returns {React.ComponentType} ComponentWrapper
 */
const withDataLoader = (Component, path) => {
  const WithDataLoaderComponent = (props) => {
    const resource = ("function" === typeof (path)) ? path(props) : path;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(apiRequestThunk(resource));
      return () => dispatch(complete(resource));
    }, []);

    const { status, data, statusCode, errorMessage } =
      useSelector(state => state.requests[resource] || {});
    return (
      ("pending" === status) && (
        <div className="loading-progress">
          <Component {...props} {...{ status, data }} />
        </div>
      ) ||
      ("error" === status) && (404 === statusCode) && (
        <Navigate to="/404" replace />
      ) ||
      ("error" === status) && (401 === statusCode) && (
        <Navigate to="/" replace />
      ) ||
      ("error" === status) && (
        <div className="has-error">
          <Component {...props} {...{ status, statusCode, errorMessage }} />
        </div>
      ) ||
      <Component {...props} {...{ data, status, statusCode }} />
    );
  };
  return WithDataLoaderComponent;
};

export { withDataLoader as default, withDataLoaderPropTypes };