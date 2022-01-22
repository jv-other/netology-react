import { useState, useEffect } from "react";

/**
 * Хук. Позволяет с помощью fetch осуществлять HTTP-запросы.
 * Если указаны deps - запрос осуществляется, только если все deps имеют значения
 * 
 * @param {string} url URL запроса 
 * @param {object} opts Параметры запроса
 * @param {[*]} deps deps для useEffect
 * @returns [ data, loading, error ] 
 */
const useJsonFetch = (url, opts, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let isCanceled = false;

  useEffect(() => {
    setError(null);
    setLoading(true);

    deps.every(i => i) && window.fetch(url, opts)
      .then(response =>
        !isCanceled && (
          response.ok ? response.json() : (async () => {
            throw {
              responseStatus: response.status,
              response: await response.text()
            }
          })()
        )
      )
      .then(json => !isCanceled && setData(json))
      .catch(err => !isCanceled && setError(err))
      .finally(() => !isCanceled && setLoading(false));

    return () => (isCanceled = true);
  }, deps);

  return [data, loading, error];
};

export { useJsonFetch as default };