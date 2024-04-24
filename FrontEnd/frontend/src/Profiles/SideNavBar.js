
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Authentication/Logout'; 

const Sidebar = ({ user_id, handleLogout }) => {
  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-gray-100 overflow-y-auto">
      <div className="p-4">
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Your Chosen Font', sans-serif", color: "#3366ff", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>SOCIAL THRIVE</h2>

        <ul className="space-y-2">
          <li>
            <Link to="/search" className="block py-2 px-4 rounded hover:bg-gray-700">Search</Link>
          </li>
          <li>
            <Link to={`/homepage/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Home</Link>
          </li>
          <li>
            <Link to={`/profile/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Profile</Link>
          </li>
          <li>
            <Link to={`/addpost/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Add Post</Link>
          </li>
          <li>
            <Link to={`/messages/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Messages</Link>
          </li>
          <li>
            <LogoutButton onLogout={handleLogout} /> 
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
