import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useJsonFetch from "../utils/useJsonFetch";

// @const
const serverUrl = process.env.REACT_APP_SERVER_URL;

/**
 * Компонент для демонстрации useJsonFetch
 * 
 * @param {*} props 
 * @returns 
 */
const DemoComponent = (props) => {
  const [start, setStart] = useState(new Date().getTime());
  const [duration, setDuration] = useState(0);
  const [reload, setReload] = useState(false);

  const [data, loading, error] = useJsonFetch(
    [serverUrl, props.resource].join("/"),
    { ...props },
    [reload]
  );

  useEffect(() =>
    setDuration(loading ? setStart(new Date().getTime()) : new Date().getTime() - start), [loading]);

  const handleClick = () => {
    setReload(prevValue => !prevValue);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span>/{props.resource}</span>
        <button className="btn request-btn" onClick={handleClick}>
          <span className={`fa fa-sync ${loading ? "fa-spin" : ""}`}></span>
        </button>
      </div>
      <div className="card-body">
        {
          data && (
            <div className="card-text alert alert-success">
              {JSON.stringify(data)}
            </div>
          )
        }
        {
          error && (
            <div className="card-text alert alert-danger">
              {(error.message || JSON.stringify(error) || "")}
            </div>
          )
        }
      </div>
      {
        duration && (
          <div className="card-footer alert-info">
            {(duration / 1000).toFixed(3) + " сек."}
          </div>
        ) || undefined
      }
    </div>
  );
};

DemoComponent.propTypes = {
  resource: PropTypes.string.isRequired
};

export default DemoComponent;