const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
//get user
const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  const user = userId
    ? await User.findById(userId)
    : await User.findOne({ username: username });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json("This user does not exist");
  }
  const { password, updatedAt, ...other } = user._doc;
  res.status(StatusCodes.OK).json(other);
};
//get friends
const getFriends = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json("This user does not exist");
  }
  const friends = await Promise.all(
    user.following.map((friendId) => {
      return User.findById(friendId);
    })
  );
  let friendList = [];
  friends.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });
  });
  res.status(StatusCodes.OK).json(friendList);
};
//update user
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json("This user does not exist");
    }
    res
      .status(StatusCodes.CREATED)
      .json("Your account has been successfully modified");
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You can't modify others people accounts");
  }
};
//delete user
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json("This user does not exist");
    }
    res
      .status(StatusCodes.OK)
      .json("Your account has been successfully deleted");
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You can't delete others people accounts");
  }
};
//follow user
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.body.userId);
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(StatusCodes.NOT_FOUND).json("This user does not exist");
    }
    if (user.followers.includes(req.body.userId)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json("You have already followed this user");
    }
    await targetUser.updateOne({ $push: { followers: req.body.userId } });
    await user.updateOne({ $push: { following: req.params.id } });
    res.status(StatusCodes.CREATED).json("You successfully followed this user");
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You cannot follow your own account");
  }
};
//unfollow user
const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.body.userId);
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(StatusCodes.NOT_FOUND).json("This user does not exist");
    }
    if (user.following.includes(req.params.id)) {
      await targetUser.updateOne({ $pull: { followers: req.body.userId } });
      await user.updateOne({ $pull: { following: req.params.id } });
      return res
        .status(StatusCodes.OK)
        .json("You successfully unfollowed this user");
    }
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You have already unfollowed this user");
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You cannot unfollow your own account");
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getFriends,
};
