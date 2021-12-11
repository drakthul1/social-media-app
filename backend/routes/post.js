const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPost,
  getAllUserPost
} = require("../controllers/post");
//create post
router.post("/", createPost);
//update post
router.put('/:id', updatePost);
//delete post
router.delete('/:id', deletePost);
//like post
router.put('/:id/like', likePost);
//get post
router.get('/:id', getPost);
//get all user's post
router.get('/timeline/:userId', getAllPost);
router.get('/profile/:username', getAllUserPost);
module.exports = router;
