import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../App'; // Contexte Socket.IO

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const socket = useContext(SocketContext); // Accéder au socket depuis le contexte

  // Mettre à jour les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Envoyer les données au backend pour l'authentification
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      const { token, username } = response.data;

      // Stocker le token pour sécuriser les futures requêtes
      localStorage.setItem('token', token);

      // Émettre un événement Socket.IO
      socket.emit('userLoggedIn', { username });

      // Rediriger vers la liste des produits
      navigate('/');
    } catch (err) {
      // Afficher un message d'erreur si la connexion échoue
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', marginTop: '100px' }}
    >
      <Typography variant="h5" textAlign="center">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
