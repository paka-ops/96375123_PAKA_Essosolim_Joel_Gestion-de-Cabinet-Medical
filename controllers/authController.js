// Import des modules nécessaires
const bcrypt = require('bcryptjs');           // Pour hasher et comparer les mots de passe
const jwt = require('jsonwebtoken');        // Pour générer et vérifier les JSON Web Tokens (JWT)
const User = require('../models/User');     // Modèle utilisateur mongoose
const Patient = require('../models/Patient');

// Fonction qui génère un access token et un refresh token avec un payload donné (ex : { id, role })
const generateTokens = (payload) => {
    // Token court terme (accessToken) avec clé secrète et durée d'expiration définie
    const accessToken  = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    // Token long terme (refreshToken) avec une autre clé et durée d'expiration plus longue
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken };
};

const register = async (req, res) => {
    try {
        // Récupère les données exactes envoyées, avec email au lieu de username
        const { email, password, role, firstName, lastName, phone } = req.body;

        // Crée un nouvel utilisateur avec les bons champs
        const user = new User({ email, password, role, firstName, lastName, phone });

        console.log('Données reçues:', req.body);
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/* ---------- login ---------- */
// Authentification d'un utilisateur existant
const login = async (req, res) => {
    try {
        const { email, password } = req.body;       // Récupération des données de connexion
        const user = await User.findOne({ email }); // Recherche de l'utilisateur par son username
        // Si pas trouvé ou mot de passe incorrect (compare bcrypt), on rejette la connexion
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ error: 'Identifiants invalides' });

        // Génération des tokens JWT (payload contient id et rôle)
        const { accessToken, refreshToken } = generateTokens({ id: user._id, role: user.role });

        // On stocke le refresh token dans la liste des tokens valides de l'utilisateur (pour pouvoir invalider si besoin)
        user.refreshTokens.push(refreshToken);
        await user.save();

        // On envoie le refresh token dans un cookie sécurisé httpOnly (non accessible en JS côté client)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // HTTPS uniquement en production
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000   // Cookie valable 7 jours
        });

        // On renvoie ld'access token dans la réponse JSON
        console.log(user);
        console.log(req.body);
        res.json({user,"accessToken" : accessToken});
    } catch (err) {
        res.status(500).json({ error: err.message });  // En cas d’erreur serveur
    }
};

/* ---------- refresh ---------- */
// Rafraîchissement de l'access token avec le refresh token stocké dans les cookies
const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;   // Récupération du refresh token dans les cookies
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token manquant' });  // Si absent, refus

    try {
        // Vérification de la validité du refresh token
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        // Recherche de l'utilisateur et vérification que le refresh token fait bien partie de ses tokens valides
        const user = await User.findById(payload.id);
        if (!user || !user.refreshTokens.includes(refreshToken))
            return res.status(403).json({ error: 'Refresh token invalide' });

        // Rotation du refresh token : suppression de l'ancien
        user.refreshTokens.pull(refreshToken);
        // Génération d'un nouvel access token et refresh token
        const { accessToken, refreshToken: newRefresh } = generateTokens({ id: user._id, role: user.role });
        // Ajout du nouveau refresh token à la liste
        user.refreshTokens.push(newRefresh);
        await user.save();

        // Mise à jour du cookie avec le nouveau refresh token
        res.cookie('refreshToken', newRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Renvoi du nouvel access token
        res.json({ accessToken });
    } catch (err) {
        // Si token expiré ou invalide
        res.status(403).json({ error: 'Refresh token expiré ou invalide' });
    }
};

/* ---------- logout ---------- */
// Déconnexion : suppression du refresh token côté serveur et côté client
const logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
        // Recherche de l'utilisateur qui possède ce refresh token
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (user) {
            // Suppression du refresh token de la liste des tokens valides
            user.refreshTokens.pull(refreshToken);
            await user.save();
        }
    }
    // Suppression du cookie côté client
    res.clearCookie('refreshToken');
    res.json({ message: 'Déconnecté' });
};

// Export des fonctions pour être utilisées dans les routes
module.exports = { register, login, refresh, logout };
