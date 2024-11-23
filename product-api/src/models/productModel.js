const mongoose = require('mongoose');

// Définition du schéma pour le modèle Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom du produit (obligatoire)
  type: { type: String, required: true }, // Type ou catégorie du produit (obligatoire)
  price: { type: Number, required: true }, // Prix du produit (obligatoire)
  rating: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 5, // Note de 0 à 5 (obligatoire, bornée)
  },
  warranty_years: { type: Number, required: true }, // Durée de garantie en années (obligatoire)
  available: { type: Boolean, required: true }, // Disponibilité du produit (obligatoire, vrai/faux)
});

// Exporte le modèle Product basé sur le schéma défini
module.exports = mongoose.model('Product', productSchema);
