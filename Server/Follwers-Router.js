import express from "express";
import { addfollower, removeFollower, acceptFriendRequest } from "./Follwers-controller.js";

const follwerrouter = express.Router();

follwerrouter.post('/followers/addfollower/', addfollower);
follwerrouter.post('/followers/removefollower/', removeFollower);
follwerrouter.put('/followers/acceptrequest/', acceptFriendRequest);

export default follwerrouter;
