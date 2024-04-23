import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Home from './Home';
import MainMessage from './Messages/MainMessage';
import Profile from './Profiles/Profile';
import AddPostPage from './Posts/AddPostPage';

const Routers = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({ userId: null, username: null });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUserInfo={setUserInfo} />} />
        {authenticated ? (
          <React.Fragment>
            <Route path="/home/:name/:user_id/*" element={<Home />} />
            <Route path="/homepage/:user_id/*" element={<Home />} />
            <Route path="/addpost/:user_id" element={<AddPostPage />} />
            <Route path='/messages/:user_id' element={<MainMessage />}/>
            <Route path='/profile/:user_id' element={<Profile />} />
          </React.Fragment>
         ) : ( 
          <Route path="*" element={<Navigate to="/login" replace />} />
         )} 
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* Render user info if authenticated */}
      {authenticated && userInfo.userId && userInfo.username && (
        <React.Fragment>
          <p>userid: {userInfo.userId}</p>
          <p>username: {userInfo.username}</p>
        </React.Fragment>
      )}
    </Router>
  );
};

export default Routers;
