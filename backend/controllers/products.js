const Product = require('../models/products');

// controllers/products.js

const createProduct = async (req, res) => {
    try {
        const {
        name,
        description,
        price,
        discount,
        originalPrice,
        availableSizes,
        category,
        stock,
        } = req.body;

        // Procesar availableSizes si es un string
        let sizes = availableSizes;
        if (typeof availableSizes === 'string') {
        sizes = JSON.parse(availableSizes);
        }

        // Procesar la imagen
        let imageData = null;
        if (req.file) {
        imageData = req.file.buffer.toString('base64');
        }

        const newProduct = new Product({
        name,
        description,
        price,
        discount,
        originalPrice,
        availableSizes: sizes,
        category,
        stock,
        image: imageData,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};
  

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(`Se obtuvieron ${products.length} productos`); // Log de productos obtenidos
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error); // Log de error
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        console.log(`Buscando producto con ID: ${req.params.id}`); // Log de búsqueda
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.warn(`Producto no encontrado con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// controllers/products.js

const updateProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        discount,
        originalPrice,
        availableSizes,
        category,
        stock,
      } = req.body;
  
      // Procesar availableSizes si es un string
      let sizes = availableSizes;
      if (typeof availableSizes === 'string') {
        sizes = JSON.parse(availableSizes);
      }
  
      // Procesar la imagen
      let imageData = null;
      if (req.file) {
        imageData = req.file.buffer.toString('base64');
      }
  
      const updatedData = {
        name,
        description,
        price,
        discount,
        originalPrice,
        availableSizes: sizes,
        category,
        stock,
      };
  
      if (imageData) {
        updatedData.image = imageData;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};
  

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        console.log(`Eliminando producto con ID: ${req.params.id}`); // Log de eliminación
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            console.warn(`Producto no encontrado para eliminar con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        console.log('Producto eliminado correctamente:', deletedProduct); // Log de éxito
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Filtrar productos por nombre o descripción
const filterProducts = async (req, res) => {
    try {
        const { search } = req.query;
        console.log(`Filtrando productos con búsqueda: "${search}"`); // Log de filtrado

        if (!search) return res.status(400).json({ message: 'Por favor, proporciona un término de búsqueda' });

        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });

        if (products.length === 0) {
            console.warn('No se encontraron productos que coincidan con la búsqueda'); // Log de advertencia
            return res.status(404).json({ message: 'No se encontraron productos que coincidan con la búsqueda' });
        }

        console.log(`Se encontraron ${products.length} productos que coinciden con la búsqueda`); // Log de éxito
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al filtrar los productos:', error); // Log de error
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
