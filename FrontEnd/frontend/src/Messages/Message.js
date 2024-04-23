import React, { useState } from 'react';
import axios from 'axios';
import './Message.css';

const Message = ({ userId, selectedUser, selectedUserId }) => {
  const [content, setContent] = useState('');

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:3001/sendmessages`, {
        sender: userId,
        recipient: selectedUserId,
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