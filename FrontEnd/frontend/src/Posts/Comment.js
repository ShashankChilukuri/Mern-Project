import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/getcomments/${postId}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const addComment = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await axios.post(`http://localhost:3001/posts/addcomments/${postId}`, {
          comment: inputValue.trim()
        });
        setComments([...comments, response.data.newComment]);
        setInputValue(" ");
        
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div className='comment-container'>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
        <input
          type='text'
          placeholder='Enter Comment'
          value={inputValue}
          onChange={handleChange}
        />
      
      <button onClick={addComment}>Enter</button>
      </div>
    </div>
  );
}