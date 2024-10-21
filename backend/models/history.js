const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const History = new Schema({
    nameProduct: {
        type: String,
        required: true
    },
    userBuyer: {
        type: String,
        required: true
    },
    datePurchase: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('History', History);