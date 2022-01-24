import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import AuthContext from "../components/AuthContext";
import useJsonFetch from "./useJsonFetch";

/**
 * App Server URL
 * @constant
 */
const serverUrl = process.env.REACT_APP_SERVER_URL;

const withDataLoaderPropTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    responseStatus: PropTypes.number,
    response: PropTypes.object
  }),
  data: PropTypes.any
};

/**
 * HOC. Оборачивает компонент загрузкой данных
 * 
 * @param {React.ComponentType} Component Оборачиваемый компонент
 * @param {function} resource Функция получения имени ресурса 
 * @returns {React.ComponentType} ComponentWrapper
 */
const withResourceLoader = (Component, resource) => {
  const WithResourceLoaderComponent = (props) => {
    const { token, handleLogout } = useContext(AuthContext);
    const [data, loading, error] = useJsonFetch([serverUrl, resource(props)].join("/"), {
      method: "GET",
      headers: { "Authorization": ["Bearer", token || "anonymous"].join(" ") }
    }, [token]);

    useEffect(() => {
      error && (401 === error.responseStatus) && handleLogout();
    }, [error]);

    return (
      loading && (
        <div className="loading-progress">
          <Component {...props} {...{ data, loading, error }} />
        </div>
      ) ||
      error && (404 === error.responseStatus) && (
        <Navigate to="/404" replace />
      ) ||
      error && (401 === error.responseStatus) && (
        <Navigate to="/" replace />
      ) ||
      error && (
        <div className="has-error">
          <Component {...props} {...{ data, loading, error }} />
        </div>
      ) ||
      <Component {...props} {...{ data, loading, error }} />
    );
  };
  return WithResourceLoaderComponent;
};

export { withResourceLoader as default, withDataLoaderPropTypes };