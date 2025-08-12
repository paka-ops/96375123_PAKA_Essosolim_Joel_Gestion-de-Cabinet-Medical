const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // lien utilisateur obligatoire
  dateOfBirth: Date,                          // date de naissance
  gender: { type: String, enum: ['Homme', 'Femme', 'Autre'] }, // sexe avec options limitées
  address: String,                            // adresse postale
  medicalHistory: [String],                   // antécédents médicaux sous forme de liste de textes
  allergies: [String],                        // allergies (liste)
  bloodGroup: String                          // groupe sanguin
}, { timestamps: true }); // createdAt & updatedAt auto

module.exports = mongoose.model('Patient', patientSchema, '96375123_patients');
