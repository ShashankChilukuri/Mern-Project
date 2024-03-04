import express from 'express';
import router  from './userRoute.js'; 


import mongoose from 'mongoose'

const app=express();
app.use(express.json());
app.use(router); 

mongoose.connect('mongodb+srv://admin:Shashank%4005112004@cluster0.kezeerg.mongodb.net/')
.then(result=>console.log("Connected to Database"))
.catch(err=>console.log(err))

app.listen(5000);

