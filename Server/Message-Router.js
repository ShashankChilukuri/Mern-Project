
import express from 'express';
import { sendMessage, getMessages } from './Message-controller.js';

const messagerouter = express.Router();

messagerouter.post('/messages', sendMessage);
messagerouter.get('/messages/:userId', getMessages);

export default messagerouter;
