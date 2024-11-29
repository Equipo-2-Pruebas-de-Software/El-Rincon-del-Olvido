// /routes/products.routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middleware/auth');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts
} = require('../controllers/products');

// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Rutas públicas
router.get('/filter', filterProducts); // Primero rutas específicas
router.get('/:id', getProductById);
router.get('/', getProducts);

// Ruta para crear producto
// /routes/products.routes.js
router.post(
  '/',
  authenticateToken, // Primero autentica el token
  authorizeAdmin,    // Luego verifica si es admin
  upload.single('image'),
  createProduct
);


// Ruta para actualizar producto
router.put(
    '/:id',
    authenticateToken, 
    authorizeAdmin,
    upload.single('image'),
    updateProduct
);

// Ruta para eliminar producto
router.delete('/:id',authenticateToken,  authorizeAdmin, deleteProduct);


module.exports = router;
