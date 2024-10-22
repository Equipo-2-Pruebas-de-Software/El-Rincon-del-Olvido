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
        try {
            const res = await axios.delete(`http://localhost:5000/api/${id}`);
        } catch (err) {
            setErrorMsg('Error al eliminar el prodcuto');
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
        try{
            setLoading(true);

            const products = await axios.get('http://localhost:5000/api/');
            setProductsList(products.data);

            setLoading(false);
        } catch (err) {
            setErrorMsg('Error al obtener los productos');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div>
            <h1>Panel de Admin</h1>

            <div className='col-md-2 text-end'>
                <button id={'create'}className='btn-sm m-3' onClick={createProductHandler}>
                    <FaEdit /> Crear Producto
                </button>
            </div>

            {
                loading
                    ?(<h2>Cargando</h2>)
                
                : productsList
                    ?(
                        <>
                            <h2>{errorMsg}</h2>
                            <table>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                        <th>DESCRIPCION</th>
                                        <th>CATEGORIA</th>
                                        <th>PRECIO</th>
                                        <th>DESCUENTO</th>
                                        <th>PRECIO ORIGINAL</th>
                                        <th>IMAGEN</th>
                                        <th>TAMAÑO DISPONIBLES</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {productsList.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.discount}</td>
                                            <td>{product.originalPrice}</td>
                                            <td>{product.image}</td>
                                            <td>{product.availableSizes}</td>
                                            <td>
                                                <button id={`edit-${index}`} className="btn-sm mx-2" onClick={() => navigate(`/admin/product/${product._id}`)}>
                                                    <FaEdit />
                                                </button>
                                                <button id={`delete-${index}`} className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <FaTrash style={{ color: 'white' }}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </>
                    )
                    
                :(<h2>Ningun producto creado</h2>)
            }

            <div className='col-md-2 text-end'>
                <button id='create-report' className='btn-sm m-3' onClick={reporteHandler}>
                    Crear Reporte
                </button>
                {
                    reporte
                        ? (<p>{reporte}</p>)
                    : (<></>)
                }
            </div>

        </div>
    )
}

export default AdminDashboard