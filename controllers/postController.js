const Post = require("../models/Post");

// Crear un nuevo post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

// Obtener todos los posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Error en el servidor");
  }
};

const getPostsbyTitle = async (req, res) => {
  const { title } = req.params; // Obtiene el título de los parámetros de ruta
  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post no encontrado" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    await post.remove();
    res.json({ msg: "Post eliminado" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  getPostsbyTitle,
  createPost,
  getPosts,
  deletePost,
};
