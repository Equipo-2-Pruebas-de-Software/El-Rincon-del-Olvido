import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
    const [productsList, setProductsList] = useState([]);
    const [reporte, setReporte] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const createProductHandler = async () => {
        try {

            const data = {
                name: '',
                description: '',
                price: 0,
                discount: 0,
                originalPrice: 0,
                availableSizes: [],
                category: '',
                image: '' 
            }

            const res = await axios.post('http://localhost:5000/api/', data);
        } catch(err) {
            setErrorMsg('Error al crear el producto');
        }
    };

    const deleteHandler = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
        if (!confirmDelete) return;
      
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:5000/api/products/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProductsList(productsList.filter((product) => product._id !== id));
        } catch (err) {
          setErrorMsg('Error al eliminar el producto');
        }
    };
      
    const reporteHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/add-report`);
            setReporte(res.data.text);
        } catch (err) {
            setErrorMsg('Error al crear el reporte');
        }
    }
    
    const fetchData = async () => {
        try {
          setLoading(true);
          const products = await axios.get('http://localhost:5000/api/products');
          setProductsList(products.data);
        } catch (err) {
          setErrorMsg('Error al obtener los productos');
        } finally {
          setLoading(false);
        }
    };
      

    

    useEffect(() => {
        fetchData();
    }, []);
    
    // AdminDashboard.js

    return (
    <div className="container mt-5">
      <h1>Panel de Administración</h1>
  
      <div className="mb-4 text-end">
        <button
          id="create"
          className="btn btn-primary"
          onClick={() => navigate('/admin/create-product')}
        >
          <FaEdit /> Crear Producto
        </button>
      </div>
  
      {loading ? (
        <h2>Cargando...</h2>
      ) : productsList.length > 0 ? (
        <>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>CATEGORÍA</th>
                <th>PRECIO</th>
                <th>STOCK</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>No hay productos creados</h2>
      )}
    </div>
  ); 
}

export default AdminDashboard