// MessageList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageList.css'; // Import CSS file for MessageList component

const MessageList = ({ userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/messages/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div className="message-list">
      <h2 className="message-list-heading">Messages</h2>
      <ul className="message-list-container">
        {messages.map((message) => (
          <li key={message._id} className={`message-item ${message.sender === userId ? 'sender-message' : 'receiver-message'}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
