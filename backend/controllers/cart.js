const Cart = require('../models/cart');
const Product = require('../models/products');
const History = require('../models/history');

// Agregar productos al carrito
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

// Ver el carrito del usuario
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'El carrito está vacío' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

// Eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
};

// Completar la compra
exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    // Aquí podrías implementar la lógica de pago o transacción

    //Añadir compra a historial
    const cur_date = new Date().now().toString();

    cart.items.map(async (item) => {
      let history = new History({ nameProduct: item.product, userBuyer: cart.user, datePurchase: cur_date, quantityProduct: item.quantity });
      await history.save();
    });

    cart.items = [];  // Vaciar el carrito
    await cart.save();

    res.json({ message: 'Compra completada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al completar la compra' });
  }
};
