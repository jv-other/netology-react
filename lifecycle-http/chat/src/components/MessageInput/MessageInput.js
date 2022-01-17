import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Форма ввода сообщения
 * 
 * @prop {function} onSubmit Callback отправки сообщения 
 * 
 */
const MessageInput = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const handleChange = ({ target }) => setMessage(target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-input"
        name="message"
        value={message}
        onChange={handleChange}
      />
      <button className="message-add-btn">&#10148;</button>
    </form>
  );
};

MessageInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default MessageInput;