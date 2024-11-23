const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Middleware pour injecter l'instance de Socket.IO
router.use((req, res, next) => {
  const io = req.app.get('io'); // Récupère l'instance de Socket.IO
  if (!io) {
    console.error('Socket.IO instance is not available');
    return res.status(500).json({ message: 'Socket.IO not initialized' });
  }
  req.io = io; // Injecte Socket.IO dans `req`
  next();
});

// Routes
router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
