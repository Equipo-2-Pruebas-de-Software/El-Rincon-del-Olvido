import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Asegúrate de importar axios para hacer peticiones HTTP
import '../styles/CartPage.css';  // Archivo CSS para personalizar los estilos

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga
  const [error, setError] = useState('');

  // Función para obtener el carrito desde el backend
  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');  // Obtener el token de autenticación
    try {
      const response = await axios.get('http://localhost:5000/api/cart/cart', {
        headers: {
          Authorization: `Bearer ${token}`  // Enviar el token en el encabezado Authorization
        }
      });
      setCartItems(response.data.items);  // Asumiendo que los ítems del carrito están en response.data.items
      setLoading(false);  // Termina el estado de carga
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      setError('No se pudo cargar el carrito.');
      setLoading(false);  // Termina el estado de carga
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Función para actualizar la cantidad de un producto
  const updateQuantity = async (id, cantidad) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/api/cart/update-quantity/${id}`, { cantidad }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Actualiza la cantidad en el frontend localmente después de que el backend responda
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };

  // Función para eliminar un producto del carrito
  const removeItem = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove-item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Actualiza el carrito localmente después de que el backend elimine el producto
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  // Calcular el total del carrito
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  if (loading) {
    return <p className="text-center">Cargando carrito...</p>;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

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
