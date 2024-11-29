// AdminProductCreate.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProductCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('men'); // Valor por defecto
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [image, setImage] = useState(null); // Para manejar la imagen
  const [stock, setStock] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  // Lista de categorías disponibles
  const categories = [
    { value: 'men', label: 'Hombre' },
    { value: 'women', label: 'Mujer' },
    // Agrega más categorías si es necesario
  ];

  // Lista de tallas disponibles
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setAvailableSizes((prevSizes) =>
      prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  
  // Agregar todos los campos al FormData
  formData.append('name', name);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('price', price);
  formData.append('discount', discount);
  formData.append('originalPrice', originalPrice);
  formData.append('stock', stock);
  
  // Agregar las tallas disponibles
  availableSizes.forEach((size) => {
    formData.append('availableSizes', size);
  });
  
  // Agregar la imagen si existe
  if (image) {
    formData.append('image', image);
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMsg('No se encontró el token de autenticación.');
      return;
    }
    console.log('Token desde localStorage:', token);

    await axios.post('http://localhost:5000/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });          
    navigate('/admin/dashboard');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    setErrorMsg(error.response?.data?.message || 'Error al crear el producto');
  }
};

  
  
  

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Producto</h2>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre del producto</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            required
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Descuento */}
        <div className="mb-3">
          <label className="form-label">Descuento (%)</label>
          <input
            type="number"
            className="form-control"
            required
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* Precio Original */}
        <div className="mb-3">
          <label className="form-label">Precio Original</label>
          <input
            type="number"
            className="form-control"
            required
            min="0"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock Disponible</label>
          <input
            type="number"
            className="form-control"
            required
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* Tallas Disponibles */}
        <div className="mb-3">
          <label className="form-label">Tallas Disponibles</label>
          <div>
            {sizes.map((size) => (
              <div className="form-check form-check-inline" key={size}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={size}
                  id={`size-${size}`}
                  onChange={handleSizeChange}
                />
                <label className="form-check-label" htmlFor={`size-${size}`}>
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label">Imagen del Producto</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="btn btn-success">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default AdminProductCreate;
