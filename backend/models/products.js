const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    availableSizes: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Product',Product);