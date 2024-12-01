const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getPosts,
  getPostsbyTitle,
  getPostsbyId,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

// Crear un nuevo post
router.post("/", upload, createPost);

//Obtener todos los posts
router.get("/", getPosts);

//Obtener post por titulo
router.get("/:title", getPostsbyTitle);
//Obtener post por id
router.get("/:_id", getPostsbyId);
// Otros endpoints...
router.delete("/:_id", deletePost);

router.put("/:_id", upload, updatePost);
module.exports = router;
