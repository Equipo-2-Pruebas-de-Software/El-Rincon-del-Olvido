const express = require('express');
const router = express.Router();
const {createProduct, getProducts, getProductById, updateProduct, deleteProduct, filterProducts} = require('../controllers/products');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/filter', filterProducts);

module.exports = router;
