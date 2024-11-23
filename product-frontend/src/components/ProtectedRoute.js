import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Récupérer le token du localStorage
  const token = localStorage.getItem('token');

  // Si le token est absent, rediriger vers la page de connexion
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si le token est présent, afficher le composant enfant
  return children;
};

export default ProtectedRoute;
