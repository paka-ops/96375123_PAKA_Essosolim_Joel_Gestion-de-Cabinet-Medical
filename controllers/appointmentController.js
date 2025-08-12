// Importation du modèle Appointment qui correspond à la collection des rendez-vous dans la base de données
const Appointment = require('../models/Appointment');

// Récupérer tous les rendez-vous
exports.getAll = async (req, res) => {
  // On cherche tous les rendez-vous dans la base, en "peuplant" (join) les champs 'patient' et 'doctor' 
  // pour récupérer les informations complètes liées à ces références.
  const appointments = await Appointment.find()
    .populate('patient doctor');
  // On renvoie la liste des rendez-vous au format JSON dans la réponse HTTP
  res.json(appointments);
};

// Créer un nouveau rendez-vous
exports.create = async (req, res) => {
  // Création d'une nouvelle instance Appointment avec les données reçues dans le corps de la requête
  const appointment = new Appointment(req.body);
  // Sauvegarde en base de données
  await appointment.save();
  // Réponse HTTP avec code 201 (Créé) et renvoi des données du rendez-vous créé
  res.status(201).json(appointment);
};

// Récupérer un rendez-vous par son identifiant
exports.getById = async (req, res) => {
  // Recherche d'un rendez-vous par son id (paramètre dans l'URL)
  // Populate pour obtenir les données complètes du patient et du docteur liés
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient doctor');
  // Renvoi du rendez-vous au format JSON
  res.json(appointment);
};

// Mettre à jour un rendez-vous existant
exports.update = async (req, res) => {
  // Recherche du rendez-vous par son id et mise à jour avec les nouvelles données reçues
  // { new: true } pour retourner le document mis à jour
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  // Renvoi du rendez-vous mis à jour
  res.json(appointment);
};

// Supprimer un rendez-vous par son identifiant
exports.delete = async (req, res) => {
  // Suppression du rendez-vous en base par son id
  await Appointment.findByIdAndDelete(req.params.id);
  // Renvoi d'un message confirmant la suppression
  res.json({ message: 'Rendez-vous supprimé' });
};
// Mise à jour partielle d'un rendez-vous
exports.updatePartial = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

