const express = require("express");
const { register, login } = require("../controls/auth");
const { get } = require("mongoose");
const {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
} = require("../controls/post");

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPost", createPosts);

router.patch("/updatePost/:id", updatePosts);
router.delete("/deletePost/:id", deletePosts);

module.exports = router;
