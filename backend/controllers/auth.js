const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = process.env.JWT_SECRET || 'miClaveSecreta123';


// Registro de usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este correo ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, isAdmin: false });
    await newUser.save();


    // Generar token JWT
    // Generar token JWT con la clave secreta correcta
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      SECRET_KEY,
      { expiresIn: '1h' }
    );


    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error('Error en el registro:', error); // Log de errores para depuración
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Crear usuario administrador
exports.createAdminUser = async (req, res) => {
  const { name, email, password, secret } = req.body;

  // Verificar el secreto
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este correo ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con isAdmin: true
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: true, // Establecer isAdmin en true
    });

    await newUser.save();

    // En auth.js
    const token = jwt.sign(
      { id: newUser._id, isAdmin: true },
      SECRET_KEY,
      { expiresIn: '1h' }
    );



    res.status(201).json({
      message: 'Usuario administrador creado exitosamente',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Correo no está registrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña es incorrecta' });
    }

    // Generar token JWT incluyendo isAdmin
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};