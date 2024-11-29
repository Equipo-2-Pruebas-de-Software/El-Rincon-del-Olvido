const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number, // Descuento como número decimal
      required: false,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    availableSizes: {
      type: [String],
      required: false,
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    addToCartCount: {
      type: Number,
      default: 0,
      required: true,
    },
    purchaseCount: {
      type: Number,
      default: 0,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', Product);
