import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');  // NUEVO Limpiar mensaje de error al cambiar el formulario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Iniciar sesión
        const response = await axios.post('/api/login', { email, password });


        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home'); 
      } else {
        // Registro
        const response = await axios.post('/api/register', { name, email, password });
        localStorage.setItem('user', JSON.stringify(response.data.user)); // NUEVO
        navigate('/home'); // NUEVO
      }
    } catch (error) {
      // Mostrar mensaje de error si el nombre de usuario ya existe
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error en el registro o inicio de sesión');
      }
    }
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
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  autoComplete="off"
                />
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
              <div className="mb-3">
                <label htmlFor="register-password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crea una contraseña"
                  required
                  autoComplete="off"
                />
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
