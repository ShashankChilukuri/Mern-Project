import express from 'express';
import {addpost, deletepost, getAllPosts, getByuserid,  updatepost} from './Post-Controler.js'; 
import { addcoment, deletecomment,getcomment } from './Comment-Controller.js';
import { decdislike, incrementdislike, incrementlike,declike } from './Like-Controller.js';

const postrouter = express.Router();

postrouter.get('/posts/',getAllPosts);
postrouter.post('/posts/add/',addpost);
postrouter.post('/posts/update/:id',updatepost);
postrouter.delete('/posts/delete/:id',deletepost);
postrouter.get('/posts/getbyuserid/:user_id', getByuserid);
postrouter.post('/posts/addcomments/:postId/',addcoment);
postrouter.delete('/posts/deletecomment/:postId/',deletecomment);
postrouter.get('/posts/getcomments/:pid/',getcomment);
postrouter.put('/posts/incrementlike/:postId', incrementlike);
postrouter.put('/posts/incrementdislike/:postId', incrementdislike);
postrouter.put('/posts/declike/:postId', declike);
postrouter.put('/posts/decdislike/:postId', decdislike);

export default postrouter;