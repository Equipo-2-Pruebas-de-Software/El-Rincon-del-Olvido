// src/components/AuthPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';  // Importar el contexto de usuario
import '../styles/AuthPage.css';

const AuthPage = () => {
  const { updateUser } = useContext(UserContext);  // Obtener el método updateUser del contexto
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? (
          <div>
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Campos de inicio de sesión */}
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
              {/* Campos de registro */}
              <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
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