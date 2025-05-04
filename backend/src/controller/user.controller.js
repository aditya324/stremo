import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "fullName",
        "friends",
        "profilePic",
        "nativeLanguage",
        "learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function recomendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentuser = req.user;

    const recomendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { $id: { $nin: currentuser.friends } }, //exclude current user friends
        {
          isOnboarded: true,
        },
      ],
    });

    res.status(200).json(recomendedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const id = req.user.id;
    const { id: recepientId } = req.params.id;

    if (id === recepientId) {
      return res
        .status(400)
        .json({ message: "you can't send friend request to yourself" });
    }

    const recipient = await User.findById(recepientId);
    if (!recipient) {
      return res.status(404).json({ message: "recipient not found" });
    }

    if (recipient.friends.includes(id)) {
      return res.status(400).json({ message: "you are already friends" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        {
          sender: id,
          recipient: recepientId,
        },
        {
          sender: recepientId,
          recipient: id,
        },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "friend request already sent" });
    }

    const friendRequest = await FriendRequest.create({
      sender: id,
      recipient: recepientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params.id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "request not found" });
    }

    if (FriendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "you are not authorized to accept this request" });
    }

    FriendRequest.status = "accepted";
    FriendRequest.save();
    await User.findOneAndUpdate(
      { _id: FriendRequest.sender }, // filter
      { $addToSet: { friends: FriendRequest.recipient } } // update
    );

    await User.findOneAndUpdate(
      { _id: FriendRequest.recipient }, // filter
      { $addToSet: { friends: FriendRequest.sender } } // update
    );

    res.status(200).json({ message: "friend request accepted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incommingReq = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      `fullName profilePic nativeLanguage learningLanguage`
    );
    const acceptedReq = await FriendRequest.find({
      recipient: req.user.id,
      status: "accepted",
    }).populate("recipient", `fullName profilePic `);

    res.status(200).json({ incommingReq, acceptedReq });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getOutGoingFriendRequests(req, res) {
  try {
    const outGoingFriendRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      `fullName profilePic nativeLanguage learningLanguage`
    );
    res.status(200).json(outGoingFriendRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}
