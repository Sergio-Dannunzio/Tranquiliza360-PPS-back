const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Middleware
app.use(cors());  // Para permitir peticiones entre diferentes orígenes (CORS)
app.use(express.json());  // Para manejar el cuerpo de las peticiones como JSON

// Importar las rutas
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});