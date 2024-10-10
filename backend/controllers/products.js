const Product = require('../models/products');

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { name, description, price, discount, originalPrice, availableSizes } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            discount,
            originalPrice,
            availableSizes
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, discount, originalPrice, availableSizes } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, discount, originalPrice, availableSizes },
            { new: true } // Para devolver el producto actualizado
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Filtrar productos por nombre o descripción
const filterProducts = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) return res.status(400).json({ message: 'Por favor, proporciona un término de búsqueda' });
        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });
        if (products.length === 0) return res.status(404).json({ message: 'No se encontraron productos que coincidan con la búsqueda' });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar los productos', error });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    filterProducts,
    updateProduct,
    deleteProduct
};
