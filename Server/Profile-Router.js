import express from 'express';
import { createprofile,updateprofile } from './Profile-Controller.js';
import { addfollower } from './Follwers-controller.js';

const profilerouter=express.Router();

profilerouter.post("/profile/create/",createprofile);
profilerouter.post("/profile/update/:id",updateprofile);
profilerouter.post("/profile/addf/:id",addfollower);
export default profilerouter;