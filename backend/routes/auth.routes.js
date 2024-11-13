const express = require('express');
const { register, login } = require('../controllers/auth'); // Importar los controladores
const router = express.Router();

// Rutas para el registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);

module.exports = router;
