import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A1A1A', padding: '20px 0', color: '#B0B0B0' }}>
      <div className="container">
        <div className="row">
          {/* Sección de enlaces */}
          <div className="col-md-4">
            <h5 style={{ color: '#00FFFF' }}>Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/" style={{ color: '#FF00FF' }}>Inicio</a></li>
              <li><a href="/productos" style={{ color: '#FF00FF' }}>Productos</a></li>
              <li><a href="/contacto" style={{ color: '#FF00FF' }}>Contacto</a></li>
              <li><a href="/terminos" style={{ color: '#FF00FF' }}>Términos y Condiciones</a></li>
            </ul>
          </div>
          {/* Sección de contacto */}
          <div className="col-md-4">
            <h5 style={{ color: '#00FFFF' }}>Contacto</h5>
            <p>Correo: <a href="mailto:info@neonthreads.com" style={{ color: '#FF00FF' }}>info@neonthreads.com</a></p>
            <p>Teléfono: <span style={{ color: '#FF00FF' }}>+123 456 7890</span></p>
          </div>
          {/* Sección de redes sociales */}
          <div className="col-md-4">
            <h5 style={{ color: '#00FFFF' }}>Síguenos</h5>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FF00FF', marginRight: '15px' }}>
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FF00FF', marginRight: '15px' }}>
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <p>© 2024 Neon Threads. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
