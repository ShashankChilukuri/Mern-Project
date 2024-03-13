import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email:{
        type:String,
        required:true,
        unique:true
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

const User = mongoose.model('User', UserSchema);

export default User;
