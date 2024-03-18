import Post from "./Post.js";

export const incrementlike = async (req, res) => {
  const postId = req.params.postId; 
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if(!post.liked)
        {
            post.likes += 1;
            post.liked=true;
        }
    await post.save();
    
    res.status(200).json({ message: "Like count incremented successfully" });
  } catch (error) {
    console.error('Error incrementing like:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const decdislike = async (req, res) => {
    const postId = req.params.postId; 
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if(!post.disliked)
        {
            post.dislikes -= 1;
            post.liked=true;
        }
      await post.save();
        
      res.status(200).json({ message: "DisLike count incremented successfully" });
    } catch (error) {
      console.error('Error incrementing like:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

 

export const declike = async (req, res) => {
  const postId = req.params.postId; 
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if(post.liked)
        {
            post.likes -= 1;
            post.liked=false;
        }
    await post.save();

    res.status(200).json({ message: "Like count decremented successfully" });
  } catch (error) {
    console.error('Error incrementing like:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const incrementdislike = async (req, res) => {
    const postId = req.params.postId; 
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if(post.disliked)
      {
        post.dislikes += 1;
        post.disliked=false;
      }
      await post.save();
  
      res.status(200).json({ message: "DisLike count decremented successfully" });
    } catch (error) {
      console.error('Error incrementing like:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
