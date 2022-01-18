import React from 'react';
import PropTypes from "prop-types";

const Popular = ({ children }) => (
  <div className="wrap-item wrap-item-popular">
    <span className="label">Popular!</span>
    {children}
  </div>
);

Popular.propTypes = {
  children: PropTypes.node
};

// Условие отображения компонента
Popular.withCondition = ({ views }) => 1000 < views;

export default Popular;