import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';  // Importar el contexto de usuario
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Importar los íconos
import '../styles/AuthPage.css';

const AuthPage = () => {
  const { updateUser } = useContext(UserContext);  // Obtener el método updateUser del contexto
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Estado para la visibilidad de la contraseña

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`, 
        isLogin ? { email, password } : { name, email, password }
      );

      localStorage.setItem('token', response.data.token);
      updateUser(response.data.user);  // Actualizar el contexto de usuario
      navigate('/');  // Redirigir al inicio
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error en el registro o inicio de sesión');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? (
          <div>
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="login-password" className="form-label">Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}  // Cambiar tipo según el estado
                  className="form-control"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}  // Llamar la función para alternar visibilidad
                  style={{
                    position: 'absolute',
                    top: '35px',
                    right: '10px',
                    background: 'transparent',  // Fondo transparente
                    border: 'none',  // Eliminar bordes
                    cursor: 'pointer',  // Cambiar el cursor a puntero
                    padding: '0',  // Eliminar el relleno
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Ícono de ojo según el estado */}
                </button>
              </div>
              <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
            <p className="mt-3 text-center">
              ¿No tienes una cuenta? <button className="btn-link" onClick={toggleForm}>Regístrate aquí</button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Registrarse</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-3">
                <label htmlFor="register-name" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="register-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="register-email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="register-password" className="form-label">Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}  // Cambiar tipo según el estado
                  className="form-control"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crea una contraseña"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}  // Llamar la función para alternar visibilidad
                  style={{
                    position: 'absolute',
                    top: '35px',
                    right: '10px',
                    background: 'transparent',  // Fondo transparente
                    border: 'none',  // Eliminar bordes
                    cursor: 'pointer',  // Cambiar el cursor a puntero
                    padding: '0',  // Eliminar el relleno
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Ícono de ojo según el estado */}
                </button>
              </div>
              <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p className="mt-3 text-center">
              ¿Ya tienes una cuenta? <button className="btn-link" onClick={toggleForm}>Inicia sesión aquí</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
