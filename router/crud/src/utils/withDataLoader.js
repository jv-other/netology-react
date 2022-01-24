import React from "react";
import PropTypes from "prop-types";
import useApi from "./useApi";

const withDataLoaderPropTypes = {
  /** URL запроса */
  path: PropTypes.string,
  /** Параметры запроса */
  params: PropTypes.object
};

/**
 * HOС. Оборачивает компонент хуком загрузки данных.
 * 
 * @param {React.ComponentType} Component Оборачиваемый компонент
 * @param {string} className Класс загрузочной обертки
 * @returns {React.ComponentType}
 */
const withDataLoader = (Component, className = "loading-spinner") => {
  const WithDataLoaderWrapper = (props) => {
    const { path, params } = props;
    const { data, loading, error } = useApi(path, params, [path]);

    return loading ? (
      <div className={className}>
        <Component {...props} {...{ data, loading, error }} />
      </div>
    ) : (<Component {...props} {...{ data, loading, error }} />);
  };
  WithDataLoaderWrapper.propTypes = withDataLoaderPropTypes;
  return WithDataLoaderWrapper;
};

export default withDataLoader;