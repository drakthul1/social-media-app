const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversation,
  getConversations,
} = require("../controllers/conversation.js");
//create new conversation
router.post("/", createConversation);
//get conversation of a user
router.get("/:userId", getConversation);

//get conversation include 2 userId
router.get("/find/:firstUserId/:secondUserId", getConversations);

module.exports = router;
