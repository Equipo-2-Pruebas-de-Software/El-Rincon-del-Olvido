// /routes/products.routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middleware/auth');
const authorizeAdmin = require('../middleware/authorizeAdmin');
// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts,
  incrementViewCount,
  incrementAddToCartCount,
  incrementPurchaseCount,
  generateReport,
} = require('../controllers/products');

router.get('/filter', filterProducts);
router.get('/report', generateReport);
router.post(
  '/',
  authenticateToken, // Primero autentica el token
  authorizeAdmin,    // Luego verifica si es admin
  upload.single('image'),
  createProduct
);
router.get('/', getProducts);
router.get('/:id', getProductById);
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

router.patch('/incrementViews/:id', incrementViewCount);
router.patch('/incrementAddToCart/:id', incrementAddToCartCount);
router.patch('/incrementPurchase/:id', incrementPurchaseCount);

module.exports = router;
