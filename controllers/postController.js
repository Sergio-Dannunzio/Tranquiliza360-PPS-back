const Post = require("../models/Post");

// Crear un nuevo post
const createPost = async (req, res) => {
  const { title, content, autor } = req.body;
  const imageUrl = req.file ? req.file.path : null; // URL pública de Cloudinary

  try {
    const newPost = new Post({
      title,
      autor,
      content,
      imageUrl,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err.message);
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
////Obtener el post mas reciente
const getLatestPosts = async (req, res) => {
  try {
    const posts = await Post.findOne().sort({ createdAt: -1 });
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

const getPostsbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post con ese id no encontrado" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un post
const deletePost = async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({ msg: "Post no encontrado" });
    }
    /*if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "No autorizado" });
    }*/
    const deltedPost = await Post.deleteOne(post);
    res.json({ msg: "Post eliminado" });
    return deltedPost;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, autor } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const { _id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { title, content, autor, imageUrl },
      { new: true }
    );

    res.json(updatedPost);
    return updatedPost;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar el post.");
  }
};

module.exports = {
  getLatestPosts,
  getPostsbyTitle,
  getPostsbyId,
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
