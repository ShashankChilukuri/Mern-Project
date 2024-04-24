import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profiles/Profile';
import MainMessage from './Messages/MainMessage';
import { Route, Routes } from 'react-router-dom';
import AddPost from './Posts/AddPost';
import AllPosts from './Posts/AllPosts';
import Sidebar from './Profiles/SideNavBar';

const Home = () => {
  const { user_id } = useParams();

  return (
    <div className="flex" style={{ backgroundColor: 'black' }}>
      
      <Sidebar user_id={user_id} />

      <div className="flex-1 p-4">
        <Routes>
          <Route path="/addpost" element={<AddPost user_id={user_id} />} />
          <Route path='/messages' element={<MainMessage user_id={user_id} />} />
          <Route path='/profile' element={<Profile user_id={user_id} />} />
        </Routes>


        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
          <AllPosts />
        </div>
      </div>
    </div>
  );
};

export default Home;
