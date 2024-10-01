import React from 'react';
import { Link } from 'react-router-dom';

// Función para formatear los precios con puntos en miles
const formatPrice = (price) => {
  return price.toLocaleString('es-ES'); // Formato con puntos de miles
};

const ProductCard = ({ producto }) => {
  return (
    <div className="col-6 col-lg-3 mb-4">
      <div className="card">
        <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            className="card-img-top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#ffffff' }}
          />
          <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <h6 className="card-subtitle mb-2">{producto.descripcion}</h6>
            <p className="card-text">
              <i className="fas fa-tag price-icon"></i>
              <span className="price" style={{ marginRight: '2px' }}>{formatPrice(producto.precio)}</span>
              <span className="badge badge-custom">{producto.descuento}</span>
            </p>
          </div>
        </Link>
        <div className="card-footer">
          <small><del>{formatPrice(producto.precioOriginal)}</del></small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
