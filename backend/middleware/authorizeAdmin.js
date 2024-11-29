// middleware/authorizeAdmin.js
const authorizeAdmin = (req, res, next) => {
  console.log('Usuario en authorizeAdmin:', req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador' });
  }
};

module.exports = authorizeAdmin;
