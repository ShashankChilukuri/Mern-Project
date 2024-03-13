import mongoose from 'mongoose';
import Post from './Post.js';

export const getcomment = async (req, res) => {
    const { pid } = req.params;
    try {
        const post = await Post.findById(pid);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const comments = post.comments;
        return res.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const addcoment= async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments.push(comment);
    await post.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deletecomment = async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
  
    try {
      console.log("postId:", postId);
      console.log("comment:", comment);
  
      // Ensure postId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId" });
      }
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Find the index of the comment to remove
      const commentIndex = post.comments.indexOf(comment);
      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found in post" });
      }
      
      post.comments.splice(commentIndex, 1);
      
      await post.save();
  
      res.status(200).json({ message: "Comment deleted successfully", post });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  