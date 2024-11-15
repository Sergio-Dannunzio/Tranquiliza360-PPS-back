const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err.message);
});