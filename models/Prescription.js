const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true }, // RDV lié
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },          // médecin prescripteur
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },        // patient concerné
  medications: [{                                                                                       // liste des médicaments prescrits
    name: String,        // nom médicament
    dosage: String,      // dosage
    frequency: String,   // fréquence prise
    duration: String     // durée traitement
  }],
  instructions: String,            // consignes supplémentaires
  issuedDate: { type: Date, default: Date.now }  // date d'émission, défaut aujourd'hui
}, { timestamps: true });           // createdAt & updatedAt auto

module.exports = mongoose.model('Prescription', prescriptionSchema, '96375123_prescriptions');
