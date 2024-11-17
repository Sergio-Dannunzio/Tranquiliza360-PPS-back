const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Crear un nuevo post
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Otros endpoints...

module.exports = router;