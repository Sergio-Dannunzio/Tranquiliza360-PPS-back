const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

// Función principal
(async () => {
  try {
    // Conexión a la base de datos
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a la base de datos');

    const email = 'test@example.com';
    const username = "admin";
    const plainPassword = 'password123';

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Crear el usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Guardar en la base de datos
    await newUser.save();
    console.log('Usuario añadido con éxito:', newUser);

    // Cerrar la conexión
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al añadir el usuario:', error);
  }
})();