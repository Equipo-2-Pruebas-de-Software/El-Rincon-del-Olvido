const express = require('express');
const { addToCart, getCart, removeFromCart, checkout } = require('../controllers/cart');
const authenticateToken = require('../middleware/auth');  // Middleware de autenticación

const router = express.Router();

router.post('/add-to-cart', authenticateToken, addToCart); // Añadir autenticación aquí
router.get('/cart', authenticateToken, getCart);
router.delete('/remove-item/:productId', authenticateToken, removeFromCart);
router.post('/checkout', authenticateToken, checkout);

module.exports = router;
