import express from 'express';
import {getAll, login, signup} from './User-controller.js'; 

const router = express.Router();

router.get("/api/user/", getAll);
router.post("/signup/",signup);
router.post("/login/",login);
export default router;
