// src/components/CreateAdminUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateAdminUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState(''); // Campo para el secreto
  const [message, setMessage] = useState('');

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/create-admin', {
        name,
        email,
        password,
        secret,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al crear el usuario administrador:', error);
      setMessage(error.response?.data?.message || 'Error al crear el usuario administrador');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Usuario Administrador</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleCreateAdmin}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="secret" className="form-label">Clave Secreta</label>
          <input
            type="password"
            className="form-control"
            id="secret"
            required
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Usuario Administrador</button>
      </form>
    </div>
  );
};

export default CreateAdminUser;
