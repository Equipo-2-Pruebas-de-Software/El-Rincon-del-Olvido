const express = require('express');
const { register, login, createAdminUser } = require('../controllers/auth'); // Importar createAdminUser
const router = express.Router();

// Rutas para el registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);

// Ruta para crear un usuario administrador
router.post('/create-admin', createAdminUser);

module.exports = router;
