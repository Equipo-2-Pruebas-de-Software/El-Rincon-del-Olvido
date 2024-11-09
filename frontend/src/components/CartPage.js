import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo mensaje de éxito

  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchCartItems();
    }
  }, [isAuthenticated, navigate]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart/cart');
      setCartItems(response.data.items);
      setError(''); // Limpiar error si carga correctamente
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message); // Mensaje "El carrito está vacío"
      } else {
        setError('No se pudo cargar el carrito.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, cantidad) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/update-quantity/${id}`, { cantidad });
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove-item/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  // Función para proceder al pago
  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/checkout');
      setPurchaseSuccess(true); 
      setCartItems([]); 
      setSuccessMessage(response.data.message); // Mensaje de éxito desde el backend
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Mensaje de error desde el backend
      } else {
        setError('No se pudo completar la compra.');
      }
    }
  };

  // Si la compra fue exitosa, mostrar el mensaje de éxito con redirección
  if (purchaseSuccess) {
    return (
      <div className="alert alert-success text-center" role="alert">
        <h4 className="alert-heading">¡Compra completada con éxito!</h4>
        <p>{successMessage}</p> {/* Muestra el mensaje del backend */}
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Ir a la página principal
        </button>
      </div>
    );
  }

  if (loading) return <p className="text-center">Cargando carrito...</p>;
  if (error) return <p className="text-center">{error}</p>;

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
          <button className="btn btn-primary w-100" onClick={handleCheckout}>Proceder al pago</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
