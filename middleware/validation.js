const { body } = require('express-validator');

// Validation des données pour l'inscription d'un utilisateur
exports.validateRegister = [
  // Vérifie que le champ 'email' est un email valide
  body('email').isEmail().withMessage('Email invalide'),
  // Vérifie que le mot de passe fait au moins 6 caractères
  body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  // Vérifie que le rôle est bien un des rôles autorisés
  body('role').isIn(['patient', 'doctor', 'secretary', 'admin']).withMessage('Rôle invalide')
];

// Validation des données pour la création/modification d'un rendez-vous
exports.validateAppointment = [
  // Vérifie que le champ 'appointmentDate' est une date valide au format ISO 8601
  body('appointmentDate').isISO8601().withMessage('Date invalide')
];
