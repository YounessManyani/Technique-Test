import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import de Socket.IO

const ProductForm = () => {
  const { id } = useParams(); // Récupère l'ID du produit (si édition)
  const navigate = useNavigate(); // Permet de rediriger après action
  const socket = io('http://localhost:5001'); // Connexion au serveur Socket.IO

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });

  // Charger les données si un ID est fourni (mode édition)
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5001/api/products/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.log(err));
    }

    // Déconnecter Socket.IO lorsque le composant est démonté
    return () => {
      socket.disconnect();
    };
  }, [id]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Gérer la soumission du formulaire (création ou mise à jour)
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? 'put' : 'post'; // Détermine si c'est une création ou une mise à jour
    const url = id
      ? `http://localhost:5001/api/products/${id}` // URL pour mettre à jour un produit
      : 'http://localhost:5001/api/products'; // URL pour créer un produit

    axios[method](url, formData)
      .then((res) => {
        // Émet un événement Socket.IO en fonction de l'action
        if (id) {
          socket.emit('productUpdated', res.data); // Événement pour mise à jour
        } else {
          socket.emit('productCreated', res.data); // Événement pour création
        }

        navigate('/'); // Redirige vers la liste des produits
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Champs de formulaire pour les détails du produit */}
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Type" name="type" value={formData.type} onChange={handleChange} required />
      <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      <TextField label="Rating" name="rating" type="number" value={formData.rating} onChange={handleChange} required />
      <TextField
        label="Warranty (years)"
        name="warranty_years"
        type="number"
        value={formData.warranty_years}
        onChange={handleChange}
        required
      />
      <FormControlLabel
        control={<Checkbox name="available" checked={formData.available} onChange={handleChange} />}
        label="Available"
      />
      {/* Bouton pour soumettre le formulaire */}
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Product' : 'Create Product'}
      </Button>
    </Box>
  );
};

export default ProductForm;
