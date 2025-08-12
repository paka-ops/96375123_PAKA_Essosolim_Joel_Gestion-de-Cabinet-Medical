// Middleware qui autorise l’accès uniquement si le rôle de l’utilisateur est dans la liste autorisée
// Usage : authorize('admin', 'moderator') par exemple
module.exports = (...roles) => (req, res, next) => {
  // Vérifie que le rôle de l'utilisateur (présent dans req.user.role, fixé par le middleware d'authentification)
  // fait partie des rôles autorisés passés en argument
  if (!roles.includes(req.user.role)) {
    // Sinon, refuse l’accès avec le statut 403 (Forbidden)
    return res.status(403).json({ message: 'Accès interdit' });
  }
  // Sinon, continue vers la route suivante
  next();
};
