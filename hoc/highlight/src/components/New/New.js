import React from 'react';
import PropTypes from "prop-types";

const New = ({ children }) => (
  <div className="wrap-item wrap-item-new">
    <span className="label">New!</span>
    {children}
  </div>
);

New.propTypes = {
  children: PropTypes.node
}

// Условие отображения компонента
New.withCondition = ({ views }) => 100 > views;

export default New;