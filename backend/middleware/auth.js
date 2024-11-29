// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'miClaveSecreta123';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token recibido:', token);

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: no se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token decodificado:', decoded);
    req.user = decoded;

    // Asegurar que isAdmin esté definido
    if (typeof req.user.isAdmin === 'undefined') {
      req.user.isAdmin = false;
    }

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authenticateToken;

