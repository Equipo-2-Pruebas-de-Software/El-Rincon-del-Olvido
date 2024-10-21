import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Función para formatear los precios con puntos en miles
const formatPrice = (price) => {
  return price.toLocaleString('es-ES'); // Formato con puntos de miles
};

const ProductCard = ({ productoId }) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  const getProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`); // Ruta actualizada
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error(error);
      setProducto(null);
    } finally {
      setLoading(false); // Indica que la carga ha terminado
    }
  };

  useEffect(() => {
    getProductById(productoId); // Llama a la API con el ID del producto
  }, [productoId]);

  if (loading) {
    return <p>Cargando producto...</p>; // Mensaje mientras se carga el producto
  }

  if (!producto) {
    return <p>Producto no encontrado.</p>; // Mensaje si no se encuentra el producto
  }

  return (
    <div className="col-6 col-lg-3 mb-4">
      <div className="card">
        <Link to={`/producto/${producto._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            className="card-img-top"
            src={`data:image/jpeg;base64,${producto.image}`} // Suponiendo que la imagen es en base64
            alt={producto.name}
            style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#ffffff' }}
          />
          <div className="card-body">
            <h5 className="card-title">{producto.name}</h5>
            <h6 className="card-subtitle mb-2">{producto.description}</h6>
            <p className="card-text">
              <i className="fas fa-tag price-icon"></i>
              <span className="price" style={{ marginRight: '2px' }}>{formatPrice(producto.price)}</span>
              <span className="badge badge-custom">{(producto.discount * 100).toFixed(0)}%</span> {/* Descuento en porcentaje */}
            </p>
          </div>
        </Link>
        <div className="card-footer">
          <small><del>{formatPrice(producto.originalPrice)}</del></small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
