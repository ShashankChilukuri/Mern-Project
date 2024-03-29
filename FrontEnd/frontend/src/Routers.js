import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Home from './Home';

const Routers = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        {authenticated ? (
          <Route path="/home/:name" element={<Home />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Routers;