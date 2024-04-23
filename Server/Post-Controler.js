import Post from './Post.js';
import User from './User.js'; 

export const getAllPosts=async (req,res)=>{
     try{
     const posts=await Post.find();
    if (Post.length === 0)
            return res.status(404).json({ message: 'No Posts found' });
        return res.status(200).json({ posts });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const getByuserid = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({ user: user._id });

        return res.status(200).json({ message: "Posts found successfully", posts });
    } catch (error) {
        console.error("Error occurred during finding posts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const addpost = async (req, res) => {
    const { user_id, image, caption } = req.body;
    try {
        let existingUser = await User.findById(user_id);
        if (!existingUser) {
            return res.status(400).json({ message: "No user exists with the provided user_id" });
        } 

        const newPost = new Post({
            user: existingUser._id, 
            postuser: existingUser.username, 
            image,
            caption
        });

        await newPost.save();

        await User.findByIdAndUpdate(
            existingUser._id,
            { $push: { posts: newPost._id } }
        );

        console.log('Post created:', newPost);
        return res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error occurred during posting:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


    export const updatepost = async (req, res) => {
        const { caption, image } = req.body;
        const postId = req.params.id;
        try {
            const updatedPost = await Post.findByIdAndUpdate(postId, { caption, image });
    
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            const user = await User.findById(updatedPost.user);
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            await User.findOneAndUpdate(
                { username: user._id, "posts": postId },
                { $set: { "posts.$": updatedPost } },
                { new: true }
            );
    
            return res.status(200).json({ message: "Post updated successfully", post: updatedPost });
        } catch (error) {
            console.error("Error occurred during updating post:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    

    export const deletepost = async (req, res) => {
        const postId = req.params.id;
        try {
            const deletedPost = await Post.findByIdAndDelete(postId);
    
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
    
            const user = await User.findById(deletedPost.user);
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { posts: postId } },
                { new: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Error occurred during deleting post:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    
    