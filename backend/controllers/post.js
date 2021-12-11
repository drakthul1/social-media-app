const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const createPost = async (req, res) => {
  const post = await Post.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(post);
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(StatusCodes.NOT_FOUND).json("Post does not exist");
  }
  if (post.userId === req.body.userId) {
    await post.updateOne({ $set: req.body });
    return res
      .status(StatusCodes.CREATED)
      .json("Post has been successfully updated");
  }
  res
    .status(StatusCodes.FORBIDDEN)
    .json("You can't update others people posts");
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(StatusCodes.NOT_FOUND).json("Post does not exist");
  }
  if (post.userId === req.body.userId) {
    await post.deleteOne();
    return res
      .status(StatusCodes.OK)
      .json("Post has been successfully deleted");
  }
  res
    .status(StatusCodes.FORBIDDEN)
    .json("You can't delete others people posts");
};

const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(StatusCodes.NOT_FOUND).json("Post does not exist");
  }
  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } });
    return res.status(StatusCodes.CREATED).json("You have liked the post");
  }
  await post.updateOne({ $pull: { likes: req.body.userId } });
  res.status(StatusCodes.OK).json("You have disliked the post");
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(StatusCodes.NOT_FOUND).json("Post does not exist");
  }
  res.status(StatusCodes.OK).json(post);
};

const getAllPost = async (req, res) => {
  const user = await User.findById(req.params.userId);
  const userPosts = await Post.find({ userId: user._id });
  const followerPosts = await Promise.all(
    user.following.map((followersId) => {
      return Post.find({ userId: followersId });
    })
  );
  res.status(StatusCodes.OK).json(userPosts.concat(...followerPosts));
};

const getAllUserPost = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const post = await Post.find({ userId: user._id });
  if (!post) {
    return res.status(StatusCodes.NOT_FOUND).json("Post does not exist");
  }
  res.status(StatusCodes.OK).json(post);
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPost,
  getAllUserPost,
};
