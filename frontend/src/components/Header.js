// src/components/Header.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import UserContext from '../context/UserContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { userName, logoutUser } = useContext(UserContext);
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
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ width: '40px' }} className="rounded-pill" />
          <span style={{ color: '#FF00FF', marginLeft: '10px' }}>Neon Threads</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-2">
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
          </ul>

          <form className="d-flex mx-auto w-100" style={{ maxWidth: '500px' }} onSubmit={handleSearchSubmit}>
            <div className="input-group w-100">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="fas fa-shopping-cart"></i> Carrito
              </Link>
            </li>
            {userName ? (
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
                  <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                </ul>
              </li>
            ) : (
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
