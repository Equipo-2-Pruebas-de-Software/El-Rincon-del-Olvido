import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para las redirecciones
import carrusel1 from '../assets/carrusel1.png'; // Imágenes del carrusel
import carrusel2 from '../assets/carrusel2.jpg';
import poleron3 from '../assets/carrousel1.jpeg';

const HomeCarousel = () => {
  return (
    <div className="container mt-5">
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          {/* Primer slide con enlace al detalle del producto */}
          <div className="carousel-item active">
            <Link to="/producto/9"> {/* Enlace al detalle del producto con id 1 */}
              <img src={carrusel1} className="d-block w-100" alt="Camisa 1" style={{ maxHeight: '400px', objectFit: 'cover' }} /> {/* Limitar la altura */}
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px' }}>
                <h5 style={{ fontFamily: 'Orbitron, sans-serif' }}>Camisa Ciberpunk</h5>
                <p style={{ fontFamily: 'Orbitron, sans-serif' }}>Estilo futurista y audaz.</p>
              </div>
            </Link>
          </div>

          {/* Segundo slide con enlace al detalle del producto */}
          <div className="carousel-item">
            <Link to="/producto/1"> {/* Enlace al detalle del producto con id 2 */}
              <img src={carrusel2} className="d-block w-100" alt="Polera 2" style={{ maxHeight: '400px', objectFit: 'cover' }} /> {/* Limitar la altura */}
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px' }}>
                <h5 style={{ fontFamily: 'Orbitron, sans-serif' }}>¡Gran Descuento del 92%!</h5>
                <p style={{ fontFamily: 'Orbitron, sans-serif' }}>Antes $13.990, ahora solo $990. Aprovecha la oferta en nuestra tienda.</p>
              </div>
            </Link>
          </div>

          {/* Tercer slide con enlace al detalle del producto */}
          <div className="carousel-item">
            <Link to="/producto/3"> {/* Enlace al detalle del producto con id 3 */}
              <img src={poleron3} className="d-block w-100" alt="Poleron 3" style={{ maxHeight: '400px', objectFit: 'cover' }} /> {/* Limitar la altura */}
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px' }}>
                <h5 style={{ fontFamily: 'Orbitron, sans-serif' }}>Bienvenidos a Neon Threads</h5>
                <p style={{ fontFamily: 'Orbitron, sans-serif' }}>Moda futurista con un toque ciberpunk, hecha para destacar en cualquier lugar.</p>
              </div>
            </Link>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
};

export default HomeCarousel;
