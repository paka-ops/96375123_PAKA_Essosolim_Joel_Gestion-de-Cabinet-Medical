// Import du modèle Patient, représentant la collection des patients dans la base de données
const Patient = require('../models/Patient');
const mongoose = require('mongoose');
// Récupérer tous les patients
exports.getAll = async (req, res) => {
  // Recherche de tous les patients, avec population du champ 'user' pour récupérer les infos utilisateur associées
  const patients = await Patient.find();
  console.log(patients)
  // Envoi des patients sous format JSON en réponse HTTP
  res.json(patients);
};


exports.create = async (req, res) => {
  try {
    // Vérifie que req.body.user est un ObjectId MongoDB valide
    if (!req.body.user || !mongoose.Types.ObjectId.isValid(req.body.user)) {
      return res.status(400).json({ error: "L'id utilisateur (user) est requis et doit être un ObjectId valide." });
    }

    // Crée une instance Patient avec les données reçues
    const patient = new Patient(req.body);

    // Sauvegarde en base
    await patient.save();

    // Récupère le patient créé en populant le champ 'user' pour retourner les infos complètes
    const patientPopulated = await Patient.findById(patient._id).populate('user');

    // Renvoie le patient créé avec les infos user peuplées
    res.status(201).json(patientPopulated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer un patient par son identifiant
exports.getById = async (req, res) => {
  // Recherche du patient par son id, avec population du champ 'user' pour récupérer les infos utilisateur associées
  const patient = await Patient.findById(req.params.id).populate('user');
  // Envoi du patient trouvé sous format JSON
  res.json(patient);
};

// Mettre à jour un patient existant
exports.update = async (req, res) => {
  // Recherche et mise à jour du patient identifié par req.params.id avec les nouvelles données dans req.body
  // L'option { new: true } retourne le document mis à jour
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  // Renvoi du patient mis à jour
  res.json(patient);
};

// Supprimer un patient par son identifiant
exports.delete = async (req, res) => {
  // Suppression du patient identifié par req.params.id
  await Patient.findByIdAndDelete(req.params.id);
  // Envoi d'un message confirmant la suppression
  res.json({ message: 'Patient supprimé' });
};
