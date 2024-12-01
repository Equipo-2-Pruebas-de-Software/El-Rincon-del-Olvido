import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
// src/components/ProductDetail.js
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad del producto
  const { isAuthenticated } = useContext(UserContext); // Importar el estado de autenticación
  const navigate = useNavigate();

  // Obtener datos del producto por ID
  const getProductById = async (id) => {
    try {
      // Primero, obtener el producto
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const data = await response.json();
      setProducto(data);
      await incrementViews(id);
    } catch (error) {
      console.error(error);
      setProducto(null);
    }
  };

  const incrementViews = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/incrementViews/${id}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Error al incrementar las vistas');
      }
      console.log('Vista incrementada con éxito');
    } catch (error) {
      console.error('Error al incrementar las vistas', error);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  // Función para obtener el carrito de un usuario específico desde localStorage
  const getCart = () => {
    //const userId = user?.id; // Suponiendo que `user` contiene el `id` del usuario actual
    const cart = localStorage.getItem(`cart`);
    return cart ? JSON.parse(cart) : [];
  };

  // Función para guardar el carrito en localStorage
  const saveCart = (cart) => {
    //const userId = user?.id;
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };

  // Lógica para agregar el producto al carrito
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige a la página de inicio de sesión si no está autenticado
    } else {
      const cart = getCart();

      // Verifica si el producto ya está en el carrito
      const existingProductIndex = cart.findIndex((item) => item.productId === producto._id);

      if (existingProductIndex >= 0) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        cart[existingProductIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, agrégalo como nuevo item
        cart.push({
          productId: producto._id,
          name: producto.name,
          price: producto.price,
          quantity: quantity,
        });
      }

      // Guarda el carrito actualizado en localStorage
      saveCart(cart);
      alert('Producto agregado al carrito exitosamente');
    }
  };

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`data:image/jpeg;base64,${producto.image}`}
            alt={producto.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'contain',
              backgroundColor: '#ffffff',
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.name}</h2>
          <h4 className="text-muted">{producto.description}</h4>
          <p className="mt-3">
            <strong>Precio:</strong> ${producto.price.toLocaleString('es-ES')}
          </p>
          <p>
            <strong>Descuento:</strong> {(producto.discount * 100).toFixed(0)}%
          </p>
          <p>
            <strong>Precio Original:</strong>{' '}
            <del>${producto.originalPrice.toLocaleString('es-ES')}</del>
          </p>
          <p className="mt-3">
            <strong>Precio:</strong> ${producto.price?.toLocaleString('es-ES')}
          </p>
          <p>
            <strong>Descuento:</strong> {(producto.discount * 100).toFixed(0)}%
          </p>
          <p>
            <strong>Precio Original:</strong>{' '}
            <del>${producto.originalPrice.toLocaleString('es-ES')}</del>
          </p>
          <p>
            <strong>Stock disponible:</strong> {producto.stock} unidades
          </p>
          <p>
            <strong>Tallas Disponibles:</strong>
          </p>
          <ul>
            {producto.availableSizes?.map((talla) => (
              <li key={talla}>{talla}</li>
            ))}
          </ul>

          {/* Selector de cantidad */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Cantidad:
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={producto.stock === 0}
            id="addToCartButton"
          >
            {producto.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
