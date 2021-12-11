const Message = require("../models/Message");
const { StatusCodes } = require("http-status-codes");

const addMessages = async (req, res) => {
  const newMessage = await Message.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(newMessage);
};

const getMessages = async (req, res) => {
  const message = await Message.find({
    conversationId: req.params.conversationId,
  });
  if (!message) {
    return res.status(StatusCodes.NOT_FOUND).json("Message not found");
  }

  res.status(StatusCodes.OK).json(message);
};

module.exports = { addMessages, getMessages };
