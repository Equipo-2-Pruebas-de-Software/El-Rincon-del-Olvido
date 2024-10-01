import React, { useState } from 'react';
import '../styles/CartPage.css';  // Archivo CSS para personalizar los estilos

const CartPage = () => {
  // Simulación de productos en el carrito
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nombre: 'Polera Neon',
      precio: 9900,
      cantidad: 1,
      imagen: require('../assets/ropa/polera.jpg'), // Simula la imagen del producto
    },
    {
      id: 2,
      nombre: 'Poleron Neon',
      precio: 19900,
      cantidad: 2,
      imagen: require('../assets/ropa/polera2.webp'),
    },
  ]);

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, cantidad) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calcular el total del carrito
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="cart-container">
      <h2 className="text-center">Tu Carrito</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
              <div className="cart-item-details">
                <h5>{item.nombre}</h5>
                <p>Precio: ${item.precio.toLocaleString()}</p>
                <div className="cart-item-quantity">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </div>
                <button className="btn btn-danger mt-2" onClick={() => removeItem(item.id)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Tu carrito está vacío.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-total">
          <h4>Total: ${total.toLocaleString()}</h4>
          <button className="btn btn-primary w-100">Proceder al pago</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
