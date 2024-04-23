import express from "express";
import { addfollower, removeFollower, acceptFriendRequest, getFollowersList, getFollowingList } from "./Follwers-controller.js";

const follwerrouter = express.Router();

follwerrouter.post('/followers/addfollower/', addfollower);
follwerrouter.post('/followers/removefollower/', removeFollower);
follwerrouter.put('/followers/acceptrequest/', acceptFriendRequest);
follwerrouter.get('/getfollowers/:user_id',getFollowersList);
follwerrouter.get('/getfollowing/:user_id',getFollowingList);
export default follwerrouter;
