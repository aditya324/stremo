import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutGoingFriendRequests,
  recomendedUsers,
  sendFriendRequest,
} from "../controller/user.controller.js";

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);

router.get("/", recomendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id", acceptFriendRequest);
router.get("/friend-request", getFriendRequests);
router.get("/outgoing-friend-request", getOutGoingFriendRequests);

export default router;
