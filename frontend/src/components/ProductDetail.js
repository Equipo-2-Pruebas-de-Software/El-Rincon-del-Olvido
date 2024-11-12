import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { isAuthenticated } = useContext(UserContext); // Importar el estado de autenticación
  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige a la página de inicio de sesión si no está autenticado
    } else {
      // Lógica para agregar el producto al carrito si está autenticado
      console.log('Producto agregado al carrito:', producto);
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

          <p>
            <strong>Tallas Disponibles:</strong>
          </p>
          <ul>
            {producto.availableSizes.map((talla) => (
              <li key={talla}>{talla}</li>
            ))}
          </ul>

          {/* Botón para agregar al carrito */}
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
