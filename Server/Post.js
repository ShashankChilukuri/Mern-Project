import mongoose from 'mongoose';
import User from './User.js';

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        postuser: {
            type: String 
        },
        image: {
            type: String 
        },
        caption: {
            type: String
        },
        likes: {
            type: Number,
            default: 0
        },
        liked:{
            type:Boolean,
            default:false
        },
        dislikes: {
            type: Number,
            default: 0
        },
        disliked:{
            type:Boolean,
            default:false
        },
        comments: {
            type: [String], 
            default: []
        }
    }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
