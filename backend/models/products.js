const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true // Cambiado a true si es necesario
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true // Cambiado a true si es necesario
    },
    discount: {
        type: Number, // Descuento como número decimal
        required: false
    },
    originalPrice: {
        type: Number,
        required: true // Cambiado a true si es necesario
    },
    image: {
        type: String,
        required: false
    },
    availableSizes: {
        type: [String],
        required: false
    }
}, { timestamps: true }); // Opcional: agrega timestamps para createdAt y updatedAt

module.exports = mongoose.model('Product', Product);
