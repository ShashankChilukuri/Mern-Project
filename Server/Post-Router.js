import express from 'express';
import {addpost, deletepost, getAllPosts, updatepost} from './Post-Controler.js'; 

const postrouter = express.Router();

postrouter.get('/posts/',getAllPosts);
postrouter.post('/posts/add/',addpost);
postrouter.post('/posts/update/:id',updatepost);
postrouter.post('/posts/delete/:id',deletepost);
export default postrouter;