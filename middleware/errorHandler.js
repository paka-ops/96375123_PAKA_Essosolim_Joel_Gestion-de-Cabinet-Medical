// Middleware Express pour gérer les erreurs non interceptées dans l’application
module.exports = (err, req, res, next) => {
  // Affiche la pile d’erreurs dans la console pour faciliter le debug
  console.error(err.stack);
  
  // Envoie une réponse HTTP 500 (erreur serveur) avec un message générique
  res.status(500).json({ message: 'Erreur serveur' });
};
