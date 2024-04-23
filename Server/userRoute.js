import express from 'express';
import {getAll, login, signup,getprofile, updateProfile} from './User-controller.js'; 

const router = express.Router();

router.get("/api/user/", getAll);
router.post("/signup/",signup);
router.post("/login/",login);
router.get('/getprofile/:user_id', getprofile);
router.get('/updateprofile/:user_id', updateProfile);
export default router;
