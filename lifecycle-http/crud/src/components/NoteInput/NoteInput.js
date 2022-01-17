import React, { useState } from "react";
import PropTypes from "prop-types";

import "./NoteInput.css";

/**
 * Форма ввода заметки
 * 
 * @param {function} onSubmit Callback отправки данных формы 
 * 
 */
const NoteInput = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleChange = ({ target }) => setContent(target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <label htmlFor="content" className="note-input-label">New Note</label>
      <textarea
        id="content"
        name="content"
        className="note-input-content"
        onChange={handleChange}
        required={true}
        value={content}
      />
      <button className="note-btn-add">&#10148;</button>
    </form>
  );
};

NoteInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default NoteInput;