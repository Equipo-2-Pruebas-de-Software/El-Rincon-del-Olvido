const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = 'tu_clave_secreta';
// const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // // Validación básica de entradas
  // if (!name || !email || !password) {
  //   return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  // }


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // // Generar token JWT
    // const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente' 
      // token,  // Devolver token tras el registro
      // user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    // console.error(error);  // Loggear el error para debug
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  // }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }
    

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      message: 'Inicio de sesión exitoso',
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    //console.error(error);  // Loggear el error para debug
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
