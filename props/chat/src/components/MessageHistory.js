import React from "react";
import PropTypes from "prop-types";

// Объект from
const TYPE_FROM = PropTypes.shape({
  name: PropTypes.string.isRequired
});

// Объект message
const TYPE_MESSAGE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  from: TYPE_FROM.isRequired,
  type: PropTypes.oneOf(["response", "message", "typing"]),
  time: PropTypes.string.isRequired,
  text: PropTypes.string
});

// propTypes для компонентов отображения элемента истории
const ITEM_PROP_TYPES = {
  from: TYPE_FROM,
  message: TYPE_MESSAGE
}

// Тип сообщения message
const Message = ({ from, message }) => (
  <li key={message.id}>
    <div className="message-data">
      <span className="message-data-name">
        <i className="fa fa-circle online"></i> {from.name}
      </span>
      <span className="message-data-time">{message.time}</span>
    </div>
    <div className="message my-message">{message.text}</div>
  </li>
);
Message.propTypes = ITEM_PROP_TYPES;

// Тип сообщения response
const Response = ({ from, message }) => (
  <li className="clearfix" key={message.id}>
    <div className="message-data align-right">
      <span className="message-data-time">{message.time}</span>
      &nbsp; &nbsp;
      <span className="message-data-name">{from.name}</span>
      &nbsp;
      <i className="fa fa-circle me"></i>
    </div>
    <div className="message other-message float-right">{message.text}</div>
  </li>
);
Response.propTypes = ITEM_PROP_TYPES;

// Тип сообщения typing
const Typing = ({ from, message }) => (
  <li key={message.id}>
    <div className="message-data">
      <span className="message-data-name">
        <i className="fa fa-circle online"></i> {from.name}
      </span>
      <span className="message-data-time">{message.time}</span>
    </div>
    <div>
      <i className="fa fa-ellipsis-h typing"></i>
    </div>
  </li>
);
Typing.propTypes = ITEM_PROP_TYPES;

// Компоненты по типам
const MESSAGE_RENDERS = {
  "response": Response,
  "message": Message,
  "typing": Typing
}

/**
 * Компонент визуализации истории чата
 * 
 * @param list Список сообщений 
 * @returns 
 */
const MessageHistory = ({ list = [] }) => {
  return (
    list && (0 < list.length) && <ul>
      {
        list.map(item => (
          MESSAGE_RENDERS[item.type](Object.assign(item, { message: item }))
        ))
      }
    </ul>
  );
};
MessageHistory.propTypes = {
  list: PropTypes.arrayOf(TYPE_MESSAGE)
};

export default MessageHistory;