import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Removed "BrowserRouter as Router"
import {Login} from './Authentication/Login';
import {Signup} from './Authentication/Signup'; 
import AllPosts from './Posts/AllPosts';

function App() {
  return (
    <BrowserRouter>
      <div> 
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/posts" element={<AllPosts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
