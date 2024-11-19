const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const { getPosts, getPostsbyTitle } = require("../controllers/postController");

// Crear un nuevo post
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Obtener todos los posts
router.get("/", getPosts);

//Obtener post por titulo
router.get("/:title", getPostsbyTitle);
// Otros endpoints...

module.exports = router;
