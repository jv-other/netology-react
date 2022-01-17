import React from "react";
import PropTypes from "prop-types";

/**
 * Компонент визуализации блока сообщения
 * 
 * @prop {string} message Текст сообщения
 * @prop {string} className Класс сообщения 
 * 
 */
const Message = ({ message, className, backgroundColor }) => (
  <div className={`message-item ${className}`} style={{ backgroundColor: backgroundColor }}>
    <p>{message}</p>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Message;