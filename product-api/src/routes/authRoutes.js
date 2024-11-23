const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router(); // Création d'un routeur Express


// Route pour la connexion
router.post('/login', loginUser);

// Export du routeur
module.exports = router;
