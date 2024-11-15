const express = require('express');
const router = express.Router();
const {loginUser } = require('../controllers/authController');

// Rutas de autenticación
router.post('/login', loginUser);

module.exports = router;