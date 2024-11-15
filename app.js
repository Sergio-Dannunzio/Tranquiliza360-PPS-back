const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(5000, () => console.log('Servidor en el puerto 5000'));