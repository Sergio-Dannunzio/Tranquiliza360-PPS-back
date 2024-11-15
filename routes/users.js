const express = require('express');
const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  res.status(201).json({ message: 'User registered successfully!', data: { username } });
});

module.exports = router;