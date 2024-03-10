import express from 'express';
import router from './userRoute.js';
import postrouter from './Post-Router.js';
import mongoose from 'mongoose';
import profilerouter from './Profile-Router.js';
import cors from 'cors';

const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(express.json());
app.use(router);
app.use(postrouter);
app.use(profilerouter);

mongoose.connect('mongodb+srv://admin:Shashank%4005112004@cluster0.kezeerg.mongodb.net/Project')
  .then(result => console.log("Connected to Database"))
  .catch(err => console.log(err));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
