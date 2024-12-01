// AdminProductEdit.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminProductEdit = () => {
  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { id: productId } = useParams();
  const navigate = useNavigate();

  // Lista de categorías disponibles
  const categories = [
    { value: 'men', label: 'Hombre' },
    { value: 'women', label: 'Mujer' },
    // Agrega más categorías si es necesario
  ];

  // Lista de tallas disponibles
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setErrorMsg('Error al obtener el producto');
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      availableSizes: prevProduct.availableSizes.includes(value)
        ? prevProduct.availableSizes.filter((size) => size !== value)
        : [...prevProduct.availableSizes, value],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      newImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar archivos
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    formData.append('originalPrice', product.originalPrice);
    formData.append('stock', product.stock);

    // Agregar las tallas disponibles
    product.availableSizes.forEach((size) => {
      formData.append('availableSizes', size);
    });

    // Agregar la imagen si existe una nueva
    if (product.newImage) {
      formData.append('image', product.newImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setErrorMsg('Error al actualizar el producto');
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Editar Producto</h2>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre del producto</label>
          <input
            type="text"
            className="form-control"
            required
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            required
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        {/* Categoría */}
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            required
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
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
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
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
    step="any" // Permite decimales
    value={product.discount}
    onChange={(e) => {
      const value = e.target.value;
      setProduct({ ...product, discount: value === '' ? '' : parseFloat(value) });
    }}
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
            value={product.originalPrice}
            onChange={(e) => setProduct({ ...product, originalPrice: e.target.value })}
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
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
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
                  checked={product.availableSizes.includes(size)}
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
          {product.image && (
            <div className="mb-2">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                style={{ width: '200px', height: '200px', objectFit: 'contain' }}
              />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="btn btn-success">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default AdminProductEdit;
