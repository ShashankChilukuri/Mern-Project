import express from "express";
import { getmessage, sendmessage } from "./Message-controller.js";



const messagerouter = express.Router();

messagerouter.post('/messages/send/',sendmessage);
messagerouter.get('/messages/getmessage/:userId', getmessage);

export default messagerouter;