import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import "./Collapse.css";

/**
 * Компонент «подката», позволяет спрятать кусок текста за ссылку «Развернуть» 
 * 
 * @param {id} id Идентификатор компонента в DOM 
 * @param {className} className Дополнительный класс
 * @param {isExpanded} isExpanded Управление expanded состоянием компонента
 * @param {collapsedLabel} collapsedLabel Текст ссылки в expanded состоянии
 * @param {expandedLabel} expandedLabel Текст ссылки в collapsed состоянии
 * @param {onExpandedChange} onExpandedChange Обработчик смены состояний expanded/collapsed
 * 
 * @returns 
 */
const Collapse = ({
  id,
  className = "",
  isExpanded = false,
  collapsedLabel = "Развернуть",
  expandedLabel = "Свернуть",
  onExpandedChange,
  children
}) => {

  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = (evt) => {
    const isExpanded = !expanded;
    setExpanded(isExpanded);
    onExpandedChange && onExpandedChange(isExpanded);
  };

  const setWrapperHeight = content =>
    content && (content.parentNode.style.height = `${expanded ? content.offsetHeight : 0}px`);

  return (
    <div id={id} className={`collapse ${expanded ? "expanded" : "collapsed"} ${className}`}>
      <div className="collapse-content-wrapper">
        <div className="collapse-content" ref={setWrapperHeight}>
          {children}
        </div>
      </div>
      <span className="collapse-toggle" onClick={handleToggle}>
        {expanded ? expandedLabel : collapsedLabel}
      </span>
    </div>
  );

};

Collapse.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  isExpanded: PropTypes.bool,
  collapsedLabel: PropTypes.string,
  expandedLabel: PropTypes.string,
  onExpandedChange: PropTypes.func,
  children: PropTypes.node
}

export default Collapse;