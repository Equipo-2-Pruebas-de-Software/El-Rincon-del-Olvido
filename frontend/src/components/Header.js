// src/components/Header.js

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import UserContext from '../context/UserContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { userName, userAdmin, isAuthenticated, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo y nombre de la tienda */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ width: '40px' }} className="rounded-pill" />
          <span style={{ color: '#FF00FF', marginLeft: '10px' }}>Neon Threads</span>
        </Link>

        {/* Botón para menú colapsable en dispositivos pequeños */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Enlace a productos */}
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>

            {/* Enlace al panel de administración solo para administradores */}
            {userAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Panel de Administración</Link>
              </li>
            )}
            
          </ul>
          {/* Barra de búsqueda */}
          <form className="d-flex mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          {/* Opciones de usuario */}
          <ul className="navbar-nav ms-auto">
            {/* Enlace al carrito si está autenticado */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">
                  <i className="fas fa-shopping-cart"></i> Carrito
                </Link>
              </li>
            )}

            {/* Menú desplegable de usuario si está autenticado */}
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hola, {userName}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/perfil">Perfil</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </li>
            ) : (
              /* Enlace para iniciar sesión si no está autenticado */
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar sesión</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
