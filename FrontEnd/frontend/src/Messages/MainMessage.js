import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import Message from './Message';
import './Message.css';
import { useParams } from 'react-router-dom';
import Sidebar from '../Profiles/SideNavBar';
import './MCSS.css';

const MainMessage = () => {
  const [followers, setFollowers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {user_id } = useParams();
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getfollowers/${user_id}`);
        setFollowers(response.data.followers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [user_id]);

  useEffect(() => {
    console.log("Selected user:", selectedUser);
    console.log("Selected userId:", selectedUserId);
  }, [selectedUser, selectedUserId]);

  const handleUserClick = (userId, userName) => {
    setSelectedUser(userName);
    setSelectedUserId(userId);
  };

  return (
    <div className="container">
      <div className="sidebar-container">
        <Sidebar user_id={user_id} />
      </div>
    <div className="main-message-container">
      <div className="followers-list">
        <h2>Friends</h2>
        <ul>
          {followers.map((follower, index) => (
            <li key={follower.user_id || index} onClick={() => handleUserClick(follower.user_id, follower.username)}>
              {follower.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="conversation-container">
        {selectedUser ? (
          <>
            <MessageList userId={user_id} selectedUser={selectedUser} selectedUserId={selectedUserId} />
            <Message userId={user_id} selectedUser={selectedUser} selectedUserId={selectedUserId} />
          </>
        ) : (
          <p>Select a user to start conversation</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default MainMessage;
