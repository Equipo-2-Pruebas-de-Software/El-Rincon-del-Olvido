import React from 'react';
import ProductCard from './ProductCard'; // Importa el componente ProductCard
import productos from './ProductListData'; // Importa la lista de productos



const ProductList = ({ filter, searchName, minPrice, maxPrice, selectedTallas, limit }) => {
  const productosFiltrados = productos.filter((producto) => {
    // Filtrar por categoría
    if (filter !== 'all' && producto.categoria !== filter) {
      return false;
    }

    // Filtrar por nombre o descripción
    if (searchName && !producto.nombre.toLowerCase().includes(searchName.toLowerCase()) && 
        !producto.descripcion.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }

    // Filtrar por precio
    if (producto.precio < minPrice || producto.precio > maxPrice) {
      return false;
    }

    // Filtrar por tallas seleccionadas
    if (selectedTallas.length > 0 && !selectedTallas.some((talla) => producto.tallas.includes(talla))) {
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
          <ProductCard key={producto.id} producto={producto} />
        ))
      ) : (
        <p>No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};


export default ProductList;
