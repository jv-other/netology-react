import React, { useContext } from "react";
import AuthContext from "./AuthContext";

/**
 * Компонент визуализации ленты новостей
 * @component
 * 
 */
const News = () => {
  const { useApi } = useContext(AuthContext);
  const [news, loading] = useApi("private/news");

  return loading ? (
    <div className="spinner-border text-primary">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="news-container container">
      <div className="row row-cols-2 gx-5 gy-5">
        {news?.map((item) => (
          <div key={item.id} className="col">
            <div className="card">
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;