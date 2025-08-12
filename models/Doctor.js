const mongoose = require('mongoose');

// Schéma Doctor : représente un médecin lié à un utilisateur
const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // lien utilisateur obligatoire
  specialty: String,                     // spécialité médicale (optionnelle)
  licenseNumber: { type: String, unique: true }, // numéro licence unique
  consultationDuration: { type: Number, default: 30 }, // durée consult par défaut 30min
  isAvailable: { type: Boolean, default: true }        // dispo par défaut true
}, { timestamps: true }); // createdAt & updatedAt auto

module.exports = mongoose.model('Doctor', doctorSchema, '96375123_doctors');
