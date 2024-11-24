import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// Thème personnalisé pour le bouton Delete
const theme = createTheme({
  palette: {
    red: {
      main: '#ff0000',
      contrastText: '#fff',
    },
  },
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const socket = io('http://localhost:5001');

  useEffect(() => {
    // Charger la liste initiale des produits
    axios
      .get('http://localhost:5001/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    // Écouter les événements Socket.IO pour synchroniser les données
    socket.on('productCreated', (newProduct) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    });

    socket.on('productUpdated', (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    });

    socket.on('productDeleted', (deletedProductId) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== deletedProductId.id)
      );
    });

    // Déconnecter le socket lors du démontage
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`http://localhost:5001/api/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(() => {
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCreate = () => {
    navigate('/create');
  };

  return (
    <Box>
      {/* Section des boutons en haut */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New Product
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Tableau des produits */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  {/* Bouton Edit */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </Button>
                  {/* Bouton Delete */}
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="red"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </ThemeProvider>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductList;
