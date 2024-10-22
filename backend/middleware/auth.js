const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Guardar el usuario verificado en req.user para usarlo en las rutas
    next();  // Continuar al siguiente middleware o controlador
  } catch (error) {
    res.status(403).json({ message: 'Token no válido' });
  }
};

module.exports = authenticateToken;