const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado, formato de token incorrecto o no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Guardar el usuario verificado en req.user para usarlo en las rutas
    next();  // Continuar al siguiente middleware o controlador
  } catch (error) {
    console.error('Error verificando el token:', error.message); // Log del error para facilitar depuración
    return res.status(403).json({ message: 'Token no válido o expirado' });
  }
};

module.exports = authenticateToken;
