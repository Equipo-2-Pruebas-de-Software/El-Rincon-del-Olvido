import React from 'react';
import { useParams } from 'react-router-dom';
import productos from './ProductListData'; // Aquí debes tener la lista de productos

const ProductDetail = () => {
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL
  const producto = productos.find((p) => p.id === parseInt(id)); // Buscamos el producto por ID

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: '100%', height: '400px', objectFit: 'contain', backgroundColor: '#ffffff' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <h4 className="text-muted">{producto.descripcion}</h4>
          <p className="mt-3"><strong>Precio:</strong> ${producto.precio.toLocaleString('es-ES')}</p>
          <p><strong>Descuento:</strong> {producto.descuento}</p>
          <p><strong>Precio Original:</strong> <del>${producto.precioOriginal.toLocaleString('es-ES')}</del></p>

          {/* Sección para mostrar las tallas disponibles */}
          <p><strong>Tallas Disponibles:</strong></p>
          <ul>
            {producto.tallas.map((talla) => (
              <li key={talla}>{talla}</li>
            ))}
          </ul>

          <button className="btn btn-primary">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
