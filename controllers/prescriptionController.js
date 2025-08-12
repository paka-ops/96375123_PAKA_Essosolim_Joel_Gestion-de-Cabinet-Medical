// Import du modèle Prescription représentant la collection des ordonnances en base de données
const Prescription = require('../models/Prescription');

// Récupérer toutes les prescriptions
exports.getAll = async (req, res) => {
  const prescriptions = await Prescription.find()
    .populate('appointment doctor patient');
  res.json(prescriptions);
};

// Créer une nouvelle prescription
exports.create = async (req, res) => {
  const prescription = new Prescription(req.body);
  await prescription.save();
  res.status(201).json(prescription);
};

// Récupérer une prescription spécifique par son identifiant
exports.getById = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .populate('appointment doctor patient');
  res.json(prescription);
};

// Mettre à jour complètement une ordonnance (PUT)
exports.update = async (req, res) => {
  const updatedPrescription = await Prescription.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true } // retourne le document modifié, valide les données
  );
  if (!updatedPrescription) {
    return res.status(404).json({ message: 'Ordonnance non trouvée' });
  }
  res.json(updatedPrescription);
};

// Mettre à jour partiellement une ordonnance (PATCH)
exports.partialUpdate = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);
  if (!prescription) {
    return res.status(404).json({ message: 'Ordonnance non trouvée' });
  }
  Object.assign(prescription, req.body); // merge partiel des champs
  await prescription.save();
  res.json(prescription);
};

// Supprimer une ordonnance par son identifiant
exports.delete = async (req, res) => {
  await Prescription.findByIdAndDelete(req.params.id);
  res.json({ message: 'Ordonnance supprimée' });
};
