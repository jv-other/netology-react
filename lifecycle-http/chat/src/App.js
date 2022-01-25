import React, { useState, useEffect, useRef } from "react";

import ChatAPI from "./api/ChatAPI";

import Message from "./components/Message/Message";
import MessageInput from "./components/MessageInput/MessageInput";

import "./App.css";

const CHAT_API_URL = "http://localhost:7777/messages";
const REQUESTS_TIMEOUT = 3000;

const chatApi = new ChatAPI(CHAT_API_URL);

// Получение/генерация идентификатора пользователя
const userId = window.localStorage.getItem("userId") || (() => {
  const userId = window.crypto.randomUUID();
  window.localStorage.setItem("userId", userId);
  return userId;
})();

// Цвета пользователей
const usersColors = {};
const getUserColor = userId => usersColors[userId] || (() => {
  const rand = () => Math.random() * 256 >> 0;
  return (usersColors[userId] = `rgba(${rand()}, ${rand()}, ${rand()}, 0.5)`)
})();

function App() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const messagesList = useRef(null);

  const refresh = async () => {
    try {
      const newMessages = await chatApi.list(messages.length && messages[messages.length - 1].id || 0);
      setMessages(prevMessages => prevMessages.concat(newMessages));
      newMessages.length && (messagesList.current.scrollTop = 0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setLoading(true), REQUESTS_TIMEOUT);
      return () => clearTimeout(timeout);
    }
    refresh();
  }, [loading]);

  const handleAdd = async (message) => {
    await chatApi.send(userId, message);
    setLoading(true);
  };

  return (
    <div className="container">
      <h1>Anonymous Chat</h1>
      <div className="messages-list-wrapper" ref={messagesList}>
        <div className="messages-list">
          {messages.map(item => (
            <Message
              key={item.id}
              message={item.content}
              className={userId === item.userId ? "message-my" : "message=other"}
              backgroundColor={getUserColor(item.userId)}
            />
          ))}
        </div>
      </div>
      <MessageInput onSubmit={handleAdd} />
    </div>
  );
}

export default App;
