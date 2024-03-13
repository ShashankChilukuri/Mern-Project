import React, { useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import './Post.css';
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes);
  const [dislike, setDislike] = useState(post.dislikes);
  const [showComment, setShowComment] = useState(false);
  const [likeFlag, setLikeFlag] = useState(0); // State to manage like toggle
  const [dislikeFlag, setDislikeFlag] = useState(0); // State to manage dislike toggle

  const incrementLike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/incrementlike/${post._id}`);
      const updatedLikeCount = response.data.likes;
      setLike(updatedLikeCount);
      window.location.reload(false);
    } catch (error) {
      console.error('Error incrementing like:', error);
    }
  };

  const decrementLike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/declike/${post._id}`);
      const updatedLikeCount = response.data.likes;
      setLike(updatedLikeCount);
      window.location.reload(false);
    } catch (error) {
      console.error('Error decrementing like:', error);
    }
  };

  const incrementDislike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/incrementdislike/${post._id}`);
      const updatedDislikeCount = response.data.dislikes;
      setDislike(updatedDislikeCount);
      window.location.reload(false);
    } catch (error) {
      console.error('Error decrementing dislike:', error);
    }
  };

  const decrementDislike = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/decdislike/${post._id}`);
      const updatedDislikeCount = response.data.dislikes;
      setDislike(updatedDislikeCount);
      window.location.reload(false);
    } catch (error) {
      console.error('Error decrementing dislike:', error);
    }
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  const handlelike = () => {
    if (likeFlag === 0) {
      incrementLike();
      setLikeFlag(-1); // Set flag to indicate like incremented
    } else {
      decrementLike();
      setLikeFlag(0); // Reset flag
    }
  };

  const handledislike = () => {
    if (dislikeFlag === 0) {
      incrementDislike();
      setDislikeFlag(-1); // Set flag to indicate dislike incremented
    } else {
      decrementDislike();
      setDislikeFlag(0); // Reset flag
    }
  };

  return (
    <div className="center-container">
      <div className="container">
        <p>{post.postuser}</p>
        <img src={post.image} alt={post.caption} />
        <h1>
          <span onClick={handlelike}>❤️ {like}</span>
          <span onClick={handledislike}>👎 {dislike}</span>
          <button onClick={handleComment}>Comments</button>
        </h1>
        {showComment && <Comment postId={post._id} />}
      </div>
    </div>
  );
}
