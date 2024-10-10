const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true
    }
});

modules.exports = mongoose.model('Product',Product);