import { useState, useEffect } from "react";

/**
 * Хук. Позволяет сохранять/получать данные из localStorage/sessionStorage
 * 
 * @param {object} storage localStorage|sessionStorage 
 * @param {string} key Значение ключа
 * @param {*} defaultValue Значение по умолчанию
 */
const useStorage = (storage, key, defaultValue) => {
  const [value, setValue] = useState(defaultValue || JSON.parse(storage.getItem(key)));
  useEffect(() => {
    (null !== value)
      ? storage.setItem(key, JSON.stringify(value))
      : storage.removeItem(key);
  }, [value, storage, key])

  return [value, setValue];
};

export default useStorage;