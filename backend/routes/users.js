const express = require("express");
const router = express.Router();

const {
  getUser,
  getFriends,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} = require("../controllers/users");
//get user
router.get("/", getUser);
//get friends
router.get("/friends/:userId", getFriends);
//update user
router.put("/:id", updateUser);
//delete user
router.delete("/:id", deleteUser);
//follow user
router.put("/:id/follow", followUser);
//unfollow user
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
