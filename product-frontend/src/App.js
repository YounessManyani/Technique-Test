import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';

// Crée un contexte pour partager la connexion Socket.IO dans toute l'application
export const SocketContext = createContext();

const App = () => {
  const [socket, setSocket] = useState(null); // État pour stocker l'instance Socket.IO

  useEffect(() => {
    // Initialisation de la connexion Socket.IO
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    // Déconnexion propre du socket lorsque le composant est démonté
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    // Fournir le socket à tous les composants via le contexte
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          {/* Route publique pour la connexion */}
          <Route path="/login" element={<LoginForm />} />

          {/* Route protégée pour la liste des produits */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />

          {/* Route protégée pour créer un produit */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />

          {/* Route protégée pour éditer un produit */}
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
};

export default App;
