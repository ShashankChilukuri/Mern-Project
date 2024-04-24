import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/messages/USER_ID');
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3001/messages', {
        senderId: 'SENDER_USER_ID',
        receiverId: 'RECEIVER_USER_ID',
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages(); 
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div>
        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagePage;
