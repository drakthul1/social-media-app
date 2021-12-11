const Conversation = require("../models/Conversation");
const { StatusCodes } = require("http-status-codes");

const createConversation = async (req, res) => {
  const newConversation = await Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  });
  res.status(StatusCodes.CREATED).json(newConversation);
};

const getConversation = async (req, res) => {
  const conversation = await Conversation.find({
    members: {
      $in: [req.params.userId],
    },
  });
  if (!conversation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json("Conversation does not exist");
  }
  res.status(StatusCodes.OK).json(conversation);
};

const getConversations = async (req, res) => {
  const conversation = await Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  });
  if (!conversation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json("Conversation does not exist");
  }
  res.status(StatusCodes.OK).json(conversation);
};

module.exports = { createConversation, getConversation, getConversations };
