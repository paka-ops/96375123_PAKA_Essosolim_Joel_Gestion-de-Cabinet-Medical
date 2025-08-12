const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma User : utilisateur du système (patient, médecin, secrétaire, admin)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,         // email obligatoire
    unique: true,           // email unique en base
    lowercase: true,        // converti en minuscule avant sauvegarde
    trim: true,             // supprime espaces en début/fin
  },
  password: {
    type: String,
    required: true,         // mot de passe obligatoire
    minlength: 6,           // minimum 6 caractères
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'secretary', 'admin'], // rôles autorisés
    required: true,
  },
  firstName: String,         // prénom optionnel
  lastName: String,          // nom optionnel
  phone: String,             // téléphone optionnel
  isActive: {
    type: Boolean,
    default: true,           // utilisateur actif par défaut
  },
  refreshTokens: [String],   // stocke les refresh tokens JWT pour gestion des sessions
}, { timestamps: true });    // createdAt & updatedAt auto

// Middleware pré-save : hash le mot de passe si modifié
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // si mdp pas modifié, passe au suivant
  const salt = await bcrypt.genSalt(10);            // génère un salt fort (10 rounds)
  this.password = await bcrypt.hash(this.password, salt); // hash le mot de passe
  next();
});

// Méthode d'instance pour comparer un mot de passe en clair avec le hash stocké
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema, '96375123_users');
