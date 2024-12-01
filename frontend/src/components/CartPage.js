// src/components/CartPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { isAuthenticated, user } = useContext(UserContext); // Asegurarse de que 'user' contiene los datos correctos
  const navigate = useNavigate();

  // Verificar si 'user' y 'user.id' están disponibles
  const localStorageKey = `cart`;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (localStorageKey) {
      loadCartFromLocalStorage();
    }
  }, [isAuthenticated, navigate, localStorageKey]);

  // Cargar el carrito desde localStorage
  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem(`cart`);
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  };

  // Guardar el carrito en localStorage
  const saveCartToLocalStorage = (updatedCart) => {
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  // Actualizar cantidad de un producto en el carrito
  const updateQuantity = (id, cantidad) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === id ? { ...item, quantity: Math.max(1, cantidad) } : item
    );
    saveCartToLocalStorage(updatedCart);
  };

  // Eliminar un producto del carrito
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.productId !== id);
    saveCartToLocalStorage(updatedCart);
  };

  // Simular el proceso de pago
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setSuccessMessage('Tu carrito está vacío. Agrega productos antes de proceder.');
      return;
    }
    setPurchaseSuccess(true);
    setSuccessMessage('¡Compra completada con éxito!');
    localStorage.removeItem(localStorageKey); // Limpiar el carrito después de la compra
    setCartItems([]); // Limpiar el estado local del carrito
  };

  // Calcular el total del carrito
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Mostrar mensaje de éxito después de la compra
  if (purchaseSuccess) {
    return (
      <div className="alert alert-success text-center" role="alert">
        <h4 className="alert-heading">¡Compra completada con éxito!</h4>
        <p>{successMessage}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Ir a la página principal
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="text-center">Tu Carrito</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h5>{item.name}</h5>
                <p>Precio: ${item.price.toLocaleString()}</p>
                <div className="cart-item-quantity">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                  />
                </div>
                <button className="btn btn-danger mt-2" onClick={() => removeItem(item.productId)}>
                  Eliminar
                </button>
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
          <button className="btn btn-primary w-100" onClick={handleCheckout}>
            Proceder al pago
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
