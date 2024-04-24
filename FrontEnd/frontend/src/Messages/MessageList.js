import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Message.css';

const MessageList = ({ userId, selectedUser, selectedUserId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedUser) {
          const response = await axios.get(`http://localhost:3001/messages/${userId}`, selectedUserId);
          setMessages(response.data);
        } else {
          
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId, selectedUser, selectedUserId]);

  return (
    <div className="message-list">
      <ul className="message-list-container">
        {messages.map((message) => (
          <li key={message._id} className={`message-item ${message.sender === userId ? 'sender-message' : 'receiver-message'}`}>
            <div className="message-sender">{message.sender === userId ? 'You' : selectedUser}</div>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
