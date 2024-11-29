// src/components/ProductDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
// src/components/ProductDetail.js
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { isAuthenticated } = useContext(UserContext);  // Importar el estado de autenticación
  const navigate = useNavigate();

  const getProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error(error);
      setProducto(null);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  const handleAddToCart = async () => {
      if (!isAuthenticated) {
          navigate('/login');
      } else {
          try {
              const token = localStorage.getItem('token');
              await axios.post(
                  'http://localhost:5000/api/cart/add-to-cart',
                  { productId: producto._id, quantity: 1 },
                  { headers: { Authorization: `Bearer ${token}` } }
              );
              alert('Producto agregado al carrito');
          } catch (error) {
              console.error('Error al agregar al carrito:', error);
              alert('Error al agregar al carrito');
          }
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
            style={{ width: '100%', height: '400px', objectFit: 'contain', backgroundColor: '#ffffff' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.name}</h2>
          <h4 className="text-muted">{producto.description}</h4>
          <p className="mt-3"><strong>Precio:</strong> ${producto.price.toLocaleString('es-ES')}</p>
          <p><strong>Descuento:</strong> {(producto.discount * 100).toFixed(0)}%</p>
          <p><strong>Precio Original:</strong> <del>${producto.originalPrice.toLocaleString('es-ES')}</del></p>
          <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
          <p><strong>Tallas Disponibles:</strong></p>
          <ul>
            {producto.availableSizes.map((talla) => (
              <li key={talla}>{talla}</li>
            ))}
          </ul>

          <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={producto.stock === 0}
          >
              {producto.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
