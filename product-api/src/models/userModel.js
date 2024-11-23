const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma pour le modèle User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nom d'utilisateur unique
  password: { type: String, required: true }, // Mot de passe
});

// Hachage du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Hache uniquement si le mot de passe est modifié
  const salt = await bcrypt.genSalt(10); // Génère un sel
  this.password = await bcrypt.hash(this.password, salt); // Hache le mot de passe
  next();
});

// Méthode pour vérifier un mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Export du modèle User
module.exports = mongoose.model('User', userSchema);
