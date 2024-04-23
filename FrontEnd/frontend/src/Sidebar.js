// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user_id }) => {
  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-gray-100 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <Link to={`/profile/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Profile</Link>
          </li>
          <li>
            <Link to={`/addpost/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Add Post</Link>
          </li>
          <li>
            <Link to="/search" className="block py-2 px-4 rounded hover:bg-gray-700">Search</Link>
          </li>
          <li>
            <Link to={`/logout/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Logout</Link>
          </li>
          <li>
            <Link to={`/messages/${user_id}`} className="block py-2 px-4 rounded hover:bg-gray-700">Messages</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
