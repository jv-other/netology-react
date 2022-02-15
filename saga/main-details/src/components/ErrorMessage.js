import React from "react";
import { useDispatch } from "react-redux";

import { retry } from "../store/requestSlice";

/**
 * Сообщение об ошибке
 * 
 * @component
 * 
 */
const ErrorMessage = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(retry());

  return (
    <div className="alert alert-danger text-center">
      Произошла ошибка!
      <button type="button" className="btn btn-secondary ms-3" onClick={handleClick}>
        Повторить запрос
      </button>
    </div>
  );
};

export default ErrorMessage;