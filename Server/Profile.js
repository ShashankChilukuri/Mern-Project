import mongoose from 'mongoose';
import User from './User.js'; 

export const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String 
    },
    dob: {
        type: Date 
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'] 
    },
    followers: {
        type: [String],
        default: [] 
    },
    followerscount: {
        type:Number,
        default: 0 
    },
    following: {
        type: [String], 
        default: []
    },
    followingcount: {
        type:Number,
        default: 0 
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    },
    
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
