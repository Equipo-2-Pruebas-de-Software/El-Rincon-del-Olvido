import React from 'react';
import HomeCarousel from './HomeCarousel'; // Carrusel que ya habías implementado
import ProductList from './ProductList';

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <h2 className="text-center pt-4">Nuestros Productos</h2>

      {/* Contenedor para el ProductList */}
      <div className="product-list-container">
        <ProductList filter="all" selectedTallas={[]} limit={4} /> {/* Limitar a 4 productos */}
      </div>
    </div>
  );
};

export default Home;
