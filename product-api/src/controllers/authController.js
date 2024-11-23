const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Inscription
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifie si un utilisateur avec le même nom d'utilisateur existe déjà
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Crée un nouvel utilisateur
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' }); // Succès
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

// Connexion
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Recherche l'utilisateur par son nom
    const user = await User.findOne({ username });

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    if (user && (await user.matchPassword(password))) {
      // Génère un token JWT avec une durée d'expiration de 1 heure
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token }); // Retourne le token
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); // Identifiants invalides
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

// Middleware pour protéger les routes
const protect = (req, res, next) => {
  // Vérifie si un token est présent dans l'en-tête Authorization
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' }); // Aucun token

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les données du token à la requête
    next(); // Passe au middleware suivant
  } catch (error) {
    res.status(401).json({ message: 'Token invalid or expired' }); // Token invalide ou expiré
  }
};

module.exports = { registerUser, loginUser, protect };
