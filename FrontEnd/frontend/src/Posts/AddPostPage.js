import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Profiles/SideNavBar';
import AddPost from './AddPost';
import './APostpage.css';

const AddPostPage = () => {
  const { user_id } = useParams();

  return (
    <div className="container">
     
        <Sidebar user_id={user_id} />
      
      <div className="add-post-container">
        <AddPost user_id={user_id} />
      </div>
    </div>
  );
};

export default AddPostPage;
