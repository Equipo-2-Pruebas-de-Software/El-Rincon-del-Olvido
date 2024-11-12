const express = require("express");
const router = express.Router();
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
  generateReport
} = require("../controllers/products");

router.get("/filter", filterProducts);
router.get("/report",generateReport);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
