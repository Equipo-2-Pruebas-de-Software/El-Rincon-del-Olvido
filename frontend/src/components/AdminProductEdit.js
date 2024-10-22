import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminProductEdit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [availableSizes, setAvailableSizes]  = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { id: productId } = useParams();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            _id: productId,
            name,
            description,
            price: originalPrice - discount,
            discount,
            originalPrice,
            availableSizes,
            category,
            image
        };

        try {
            const result = await axios.put(`http://localhost:5000/api/${productId}`, updatedProduct);
            navigate('/admin/dashboard');
            
        } catch (err) {
            setErrorMsg('Error al obtener el producto');
        }

    }

    const fetchData = async () => {
        try{
            setLoading(true);

            const product = await axios.get(`http://localhost:5000/api/${productId}`);
            
            setName(product.data.name);
            setPrice(product.data.price);
            setImage(product.data.image);
            setCategory(product.data.category);
            setDescription(product.data.description);
            setDiscount(product.data.discount);
            setOriginalPrice(product.data.originalPrice);
            setAvailableSizes(product.data.availableSizes);

            setLoading(false);
        } catch (err) {
            setErrorMsg('Error al obtener los productos');
        }
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            <h2>Edición de Productos</h2>

            {
                loading
                    ?(<h2>Cargando</h2>)
                
                : errorMsg
                    ?(<h2>{errorMsg}</h2>)
                :(
                    <form onSubmit={submitHandler}>

                        <div className="col-md-4">
                            <label className="form-label">Nombre del producto</label>
                            <input
                                type="text"
                                id='edit-name'
                                className="form-control"
                                placeholder="Editar nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Descripción del producto</label>
                            <input
                                type="text"
                                id='edit-desc'
                                className="form-control"
                                placeholder="Editar descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Descuento del producto</label>
                            <input
                                type="number"
                                id='edit-dis'
                                className="form-control"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Precio original del producto</label>
                            <input
                                type="number"
                                id='edit-price'
                                className="form-control"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Categoria del producto</label>
                            <input
                                type="text"
                                id='edit-cat'
                                className="form-control"
                                placeholder="Editar categoria"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn-sm my-2'
                        >Editar</button>

                    </form>
                )
                
            }
        </div>
    )
}

export default AdminProductEdit