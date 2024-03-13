import express from 'express';
import { updateprofile ,findprofile} from './Profile-Controller.js';
import { addfollower } from './Follwers-controller.js';

const profilerouter=express.Router();

profilerouter.post("/profile/create/",updateprofile);
profilerouter.post("/profile/find/",findprofile);
profilerouter.post("/profile/addf/:id",addfollower);
export default profilerouter;