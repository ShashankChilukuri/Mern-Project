import express from 'express';
import router from './userRoute.js';
import postrouter from './Post-Router.js';
import mongoose from 'mongoose';
import messagerouter from './Message-Router.js';
import cors from 'cors';
import follwerrouter from './Follwers-Router.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); 
app.use(express.json({ limit: '10mb' }));
app.use(router);
app.use(postrouter);
app.use(messagerouter);
app.use(follwerrouter);

mongoose.connect('mongodb+srv://admin:Shashank%4005112004@cluster0.kezeerg.mongodb.net/Project')
  .then(result => console.log("Connected to Database"))
  .catch(err => console.log(err));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
