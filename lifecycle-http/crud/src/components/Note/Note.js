import React from "react";
import PropTypes from "prop-types";

import "./Note.css";

/**
 * Компонент визуализации заметки
 * 
 * @component
 * @prop {nubmer} id Идентификатор заметки
 * @prop {string} content Текст заметки
 * @prop {function} onRemove Callback удаления записи 
 *  
 */
const Note = ({ id, content, onRemove }) => (
  <div className="note-item">
    <p>{content}</p>
    <span className="note-remove" onClick={() => onRemove(id)}>&#10006;</span>
  </div>
);

Note.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Note;