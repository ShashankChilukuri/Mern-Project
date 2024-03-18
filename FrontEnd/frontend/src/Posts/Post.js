import React, { useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import './Post.css';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes);
  const [dislike, setDislike] = useState(post.dislikes);
  const [showComment, setShowComment] = useState(false);
  const [likeFlag, setLikeFlag] = useState(0);
  const [dislikeFlag, setDislikeFlag] = useState(0);

  const incrementLike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/incrementlike/${post._id}`);
      const updatedLikeCount = response.data.likes;
      setLike(updatedLikeCount);
      setLikeFlag(1);
    } catch (error) {
      console.error('Error incrementing like:', error);
    }
  };

  const decrementLike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/declike/${post._id}`);
      const updatedLikeCount = response.data.likes;
      setLike(updatedLikeCount);
      setLikeFlag(0);
    } catch (error) {
      console.error('Error decrementing like:', error);
    }
  };

  const incrementDislike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/incrementdislike/${post._id}`);
      const updatedDislikeCount = response.data.dislikes;
      setDislike(updatedDislikeCount);
      setDislikeFlag(1);
    } catch (error) {
      console.error('Error incrementing dislike:', error);
    }
  };

  const decrementDislike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/decdislike/${post._id}`);
      const updatedDislikeCount = response.data.dislikes;
      setDislike(updatedDislikeCount);
      setDislikeFlag(0);
    } catch (error) {
      console.error('Error decrementing dislike:', error);
    }
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <div className="center-container">
      <div className="container">
        <p>{post.postuser}</p>
        <img src={post.image} alt={post.caption} />
        <h1>
          <span onClick={likeFlag === 0 ? incrementLike : decrementLike}>❤️ {like}</span>
          <span onClick={dislikeFlag === 0 ? incrementDislike : decrementDislike}>👎 {dislike}</span>
          <button onClick={handleComment}>Comments</button>
        </h1>
        {showComment && <Comment postId={post._id} />}
      </div>
    </div>
  );
}
