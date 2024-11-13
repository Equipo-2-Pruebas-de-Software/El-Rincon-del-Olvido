const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const History = new Schema({
  nameProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userBuyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datePurchase: {
    type: String,
    required: true,
  },
  quantityProduct: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('History', History);
