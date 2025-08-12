const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connecté');
  } catch (err) {
    console.error('Erreur MongoDB :', err);
    process.exit(1);
  }
};

module.exports = connectDB();