import express from 'express';
import router  from './userRoute.js'; 
import postrouter from './Post-Router.js';
import mongoose from 'mongoose';
import profilerouter from './Profile-Router.js';

const app=express();
app.use(express.json());
app.use(router); 
app.use(postrouter);
app.use(profilerouter);

mongoose.connect('mongodb+srv://admin:Shashank%4005112004@cluster0.kezeerg.mongodb.net/Project')
.then(result=>console.log("Connected to Database"))
.catch(err=>console.log(err))

app.listen(5000);

