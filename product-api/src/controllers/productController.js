const Product = require('../models/productModel');

// Obtenir tous les produits
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Récupère tous les produits
    res.status(200).json(products); // Retourne les produits avec un statut 200
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Server error: Unable to fetch products' });
  }
};

// Créer un nouveau produit
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Crée un produit avec les données reçues
    const savedProduct = await newProduct.save(); // Sauvegarde dans la base de données

    const io = req.app.get('io'); // Instance Socket.IO
    if (io) io.emit('productCreated', savedProduct); // Notifie les clients

    res.status(201).json(savedProduct); // Retourne le produit créé
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Met à jour le produit
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    const io = req.app.get('io');
    if (io) io.emit('productUpdated', updatedProduct); // Notifie les clients

    res.status(200).json(updatedProduct); // Retourne le produit mis à jour
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Supprime le produit
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    const io = req.app.get('io');
    if (io) io.emit('productDeleted', { id: req.params.id }); // Notifie les clients

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Server error: Unable to delete product' });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
