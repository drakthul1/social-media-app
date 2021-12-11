const express = require("express");
const router = express.Router();
const { addMessages, getMessages } = require("../controllers/message");

//add messages
router.post("/", addMessages);

//get messages
router.get("/:conversationId", getMessages);

module.exports = router;
