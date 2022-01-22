import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Компонент визуализации деталей пользователя
 * 
 * @component
 * @prop {object} info Пользователь
 * @prop {string} dataUrl URL каталога с данными   
 */
const Details = ({ info, dataUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Загрузка будет происходить только при изменении info
  useEffect(() => {
    if (!info) {
      return;
    }

    let canceled = false;
    setLoading(true);

    window.fetch(`${dataUrl}/${info.id}.json`)
      .then(response => !canceled && response.json())
      .then(json => !canceled && setData(json))
      .finally(() => !canceled && setLoading(false));

    return () => canceled = true;
  }, [info]);

  return !loading && data ? (
    <div className="card">
      <img src={data.avatar} className="card-img-top" alt={data.name} />
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        {Object.entries(data.details).map((detail, index) => (
          <li key={index} className="list-group-item">
            {`${detail[0]}: ${detail[1]}`}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="spinner-border text-primary">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

};

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  dataUrl: PropTypes.string
}

export default Details;