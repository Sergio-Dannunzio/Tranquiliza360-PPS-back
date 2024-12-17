const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getPagination,
  getLatestPosts,
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
// obtener los post paginados
router.get("/paginated", getPagination);
//Obtener post por titulo
router.get("/title/:title", getPostsbyTitle);
//Obtener post por id
router.get("/id/:id", getPostsbyId);
//Obtener el post mas reciente
router.get("/latest-post", getLatestPosts);

// Otros endpoints...
router.delete("/:_id", deletePost);

router.put("/:_id", upload, updatePost);
module.exports = router;
