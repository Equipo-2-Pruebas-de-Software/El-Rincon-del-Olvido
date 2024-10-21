import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL
   //const producto = productos.find((p) => p.id === parseInt(id)); // 
  const [producto, setProducto] = useState(null); // Inicializamos el estado del producto

  const getProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`); // Cambia la URL según tu API
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
          <p><strong>Descuento:</strong> {producto.discount}%</p>
          <p><strong>Precio Original:</strong> <del>${producto.originalPrice.toLocaleString('es-ES')}</del></p>

          {/* Sección para mostrar las tallas disponibles */}
          <p><strong>Tallas Disponibles:</strong></p>
          <ul>
            {producto.availableSizes.map((talla) => (
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
