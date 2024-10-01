import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Cambiamos useHistory por useNavigate
import logo from '../assets/logo.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar la búsqueda
  const navigate = useNavigate(); // Hook para redirigir

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Actualiza el valor de búsqueda
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirige a la página de productos con el término de búsqueda
      navigate(`/productos?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo de la marca */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ width: '40px' }} className="rounded-pill" />
          <span style={{ color: '#FF00FF', marginLeft: '10px' }}>Neon Threads</span>
        </Link>

        {/* Botón de colapso para móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-2">
            {/* Enlace a Productos */}
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
          </ul>

          {/* Barra de búsqueda */}
          <form className="d-flex mx-auto w-100" style={{ maxWidth: '500px' }} onSubmit={handleSearchSubmit}>
            <div className="input-group w-100">
              <span className="input-group-text">
                <i className="fas fa-search"></i> {/* Cambia el ícono de lupa */}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto"
                style={{ fontFamily: 'Orbitron, sans-serif' }} // Aplicamos Orbitron a la barra de búsqueda
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          {/* Sección con Carrito e Iniciar Sesión */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="fas fa-shopping-cart"></i> Carrito
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
