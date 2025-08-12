const jwt = require('jsonwebtoken');

// Middleware pour vérifier la validité du token JWT envoyé dans le header Authorization
const authenticateToken = (req, res, next) => {
    // Récupère le header 'Authorization' (ex: "Bearer tokenici")
    const authHeader = req.headers['authorization'];
    // Extrait le token (la partie après "Bearer ")
    const token = authHeader && authHeader.split(' ')[1];
    
    // Si pas de token, refuse l'accès avec code 401 (Unauthorized)
    if (!token) return res.status(401).json({ error: 'Accès refusé' });

    // Vérifie la validité du token avec la clé secrète
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Si erreur (token invalide ou expiré), refuse avec code 403 (Forbidden)
        if (err) return res.status(403).json({ error: 'Token invalide ou expiré' });
        
        // Sinon, attache les infos décodées du token (payload) à la requête pour y accéder ensuite
        req.user = user;
        
        // Passe au middleware ou route suivante
        next();
    });
};

module.exports = { authenticateToken };
