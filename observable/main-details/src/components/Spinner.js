import React from "react";

/**
 * Индикатор загрузки
 * 
 * @component
 * 
 */
const Spinner = () => (
  <div className="text-center mt-3">
    <div className="spinner-border text-danger">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;