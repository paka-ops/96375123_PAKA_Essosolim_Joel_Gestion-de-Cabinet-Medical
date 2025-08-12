// Importation du modèle Doctor, représentant la collection des médecins dans la base de données
const Doctor = require('../models/Doctor');

// Récupérer tous les médecins
exports.getAll = async (req, res) => {
  // Recherche de tous les documents Doctor dans la base,
  // avec "populate('user')" pour récupérer les infos complètes de l'utilisateur associé (référence)
  const doctors = await Doctor.find().populate('user');
  // Envoi des médecins au format JSON en réponse HTTP
  res.json(doctors);
};

// Créer un nouveau médecin
exports.create = async (req, res) => {
  // Création d'une nouvelle instance Doctor à partir des données reçues dans la requête
  const doctor = new Doctor(req.body);
  // Sauvegarde en base de données
  await doctor.save();
  // Réponse avec le statut 201 (créé) et les données du médecin créé
  res.status(201).json(doctor);
};

// Récupérer un médecin par son identifiant
exports.getById = async (req, res) => {
  // Recherche du médecin par son id, avec "populate('user')" pour récupérer les infos liées à l'utilisateur
  const doctor = await Doctor.findById(req.params.id).populate('user');
  // Envoi du médecin en JSON
  res.json(doctor);
};

// Mettre à jour un médecin existant
exports.update = async (req, res) => {
  // Recherche et mise à jour du médecin identifié par req.params.id avec les nouvelles données dans req.body
  // { new: true } permet de retourner l'objet mis à jour
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  // Envoi du médecin mis à jour en JSON
  res.json(doctor);
};

// Supprimer un médecin par son identifiant
exports.delete = async (req, res) => {
  // Suppression du document Doctor identifié par req.params.id
  await Doctor.findByIdAndDelete(req.params.id);
  // Envoi d'un message confirmant la suppression
  res.json({ message: 'Docteur supprimé' });
};
// Mise à jour partielle d'un médecin existant
exports.partialUpdate = async (req, res) => {
  try {
    // findByIdAndUpdate avec option { new: true } pour retourner l'objet mis à jour
    // req.body contient uniquement les champs à modifier
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

