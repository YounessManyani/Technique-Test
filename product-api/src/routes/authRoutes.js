const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router(); // Création d'un routeur Express

// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Export du routeur
module.exports = router;
