
import React, { useState } from 'react';
import axios from 'axios';
import './Message.css'; 
const Message = ({ userId }) => {
  const [content, setContent] = useState('');

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:3001/messages`, {
        sender: userId,
        recipient: '65f140f0a0e2de0f03e2a828',
        content: content
      });
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-container">
      <textarea
        className="message-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      ></textarea>
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Message;
