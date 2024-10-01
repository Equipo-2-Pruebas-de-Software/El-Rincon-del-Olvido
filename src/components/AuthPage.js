import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Puedes crear un archivo CSS para estilos personalizados

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre inicio de sesión y registro

  const toggleForm = () => {
    setIsLogin(!isLogin); // Alternar entre las vistas de iniciar sesión y registrarse
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? (
          <div>
            <h2 className="text-center">Iniciar Sesión</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="login-email" placeholder="Ingresa tu correo" required />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="login-password" placeholder="Ingresa tu contraseña" required />
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
            <form>
              <div className="mb-3">
                <label htmlFor="register-name" className="form-label">Nombre Completo</label>
                <input type="text" className="form-control" id="register-name" placeholder="Ingresa tu nombre" required />
              </div>
              <div className="mb-3">
                <label htmlFor="register-email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="register-email" placeholder="Ingresa tu correo" required />
              </div>
              <div className="mb-3">
                <label htmlFor="register-password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="register-password" placeholder="Crea una contraseña" required />
              </div>
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
