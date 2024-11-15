const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:za9fs4ljS3n8Egtx@tranquilizacluster.wawiw.mongodb.net/?retryWrites=true&w=majority&appName=TranquilizaCluster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log("aaaaa")
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;