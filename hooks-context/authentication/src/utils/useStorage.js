import { useState, useEffect } from "react";

/**
 * Хук. Позволяет сохранять/получать данные из localStorage/sessionStorage
 * 
 * @param {object} storage localStorage|sessionStorage 
 * @param {string} key Значение ключа 
 */
const useStorage = (storage, key, jsonify = false) => {
  const [value, setValue] = useState(
    jsonify ? JSON.parse(storage.getItem(key)) : storage.getItem(key)
  );

  useEffect(() => {
    (null !== value)
      ? storage.setItem(key, jsonify ? JSON.stringify(value) : value)
      : storage.removeItem(key);
  }, [value, storage, key])

  return [value, setValue];
};

export default useStorage;