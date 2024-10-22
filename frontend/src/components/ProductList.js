import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Importa el componente ProductCard

const ProductList = ({ filter, searchName, minPrice, maxPrice, selectedTallas, limit }) => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products'); // Cambia la URL según sea necesario
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Llama a la función para obtener los productos
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    // Filtrar por categoría
    if (filter !== 'all' && producto.category !== filter) {
      return false;
    }

    // Filtrar por nombre o descripción
    if (searchName && 
        !producto.name.toLowerCase().includes(searchName.toLowerCase()) && 
        !producto.description.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }

    // Filtrar por precio
    if (producto.price < minPrice || producto.price > maxPrice) {
      return false;
    }

    // Filtrar por tallas seleccionadas
    if (selectedTallas.length > 0 && !selectedTallas.some((talla) => producto.availableSizes.includes(talla))) {
      return false;
    }

    return true;
  });

  // Limitar la cantidad de productos si se pasa un límite
  const productosMostrados = limit ? productosFiltrados.slice(0, limit) : productosFiltrados;

  return (
    <div className="row">
      {productosMostrados.length > 0 ? (
        productosMostrados.map((producto) => (
          <ProductCard key={producto._id} productoId={producto._id} />
        ))
      ) : (
        <p>No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ProductList;
