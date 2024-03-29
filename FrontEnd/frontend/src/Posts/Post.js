// Post.js
import React, { useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import './Post.css';

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes);
  const [dislike, setDislike] = useState(post.dislikes);
  const [showComment, setShowComment] = useState(false);
 
  const [error, setError] = useState(null);

  const handleLike = async () => {
   
    setError(null);
    try {
      const response = await axios.put(`http://localhost:3001/posts/incrementlike/${post._id}`);
      setLike(response.data.likes);
    } catch (error) {
      setError('Error liking post. Please try again later.');
    } 
  };

  const handleDislike = async () => {
    
    setError(null);
    try {
      const response = await axios.put(`http://localhost:3001/posts/incrementdislike/${post._id}`);
      setDislike(response.data.dislikes);
    } catch (error) {
      setError('Error disliking post. Please try again later.');
    } 
  };

  const toggleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <div className="post-container">
      <div className="center-container">
        <p className="username">{post.postuser}</p>
      </div>
      <div className="image-container">
        <img src={post.image} alt={post.caption} />
      </div>
      <div className="interaction">
        <span onClick={handleLike} aria-label="Like">{ '❤️'} {like}</span>
        <span onClick={handleDislike} aria-label="Dislike">{ '👎'} {dislike}</span>
        <button onClick={toggleComment}>Comments</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {showComment && <Comment postId={post._id} />}
    </div>
  );
};

export default Post;
