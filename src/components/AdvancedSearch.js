import React, { useState } from 'react';
import productos from './ProductListData'; // Importa la lista de productos

const AdvancedSearch = () => {
  // Estados para los filtros de búsqueda
  const [searchName, setSearchName] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Filtrar los productos basados en los criterios seleccionados
  const filteredProducts = productos.filter(producto => {
    const matchName = producto.nombre.toLowerCase().includes(searchName.toLowerCase());
    const matchCategory = category === 'all' || producto.categoria === category;
    const matchMinPrice = minPrice === '' || producto.precio >= parseFloat(minPrice);
    const matchMaxPrice = maxPrice === '' || producto.precio <= parseFloat(maxPrice);

    return matchName && matchCategory && matchMinPrice && matchMaxPrice;
  });

  return (
    <div className="container">
      <h2 className="text-center pt-4">Búsqueda Avanzada</h2>
      {/* Formulario para búsqueda avanzada */}
      <form className="row mb-4">
        {/* Buscar por nombre */}
        <div className="col-md-4">
          <label htmlFor="searchName" className="form-label">Nombre del producto</label>
          <input
            type="text"
            id="searchName"
            className="form-control"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* Filtrar por categoría */}
        <div className="col-md-4">
          <label htmlFor="category" className="form-label">Categoría</label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="camisas">Camisas</option>
            <option value="poleras">Poleras</option>
            <option value="polerones">Polerones</option>
          </select>
        </div>

        {/* Filtrar por precio mínimo */}
        <div className="col-md-2">
          <label htmlFor="minPrice" className="form-label">Precio Mínimo</label>
          <input
            type="number"
            id="minPrice"
            className="form-control"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Filtrar por precio máximo */}
        <div className="col-md-2">
          <label htmlFor="maxPrice" className="form-label">Precio Máximo</label>
          <input
            type="number"
            id="maxPrice"
            className="form-control"
            placeholder="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </form>

      {/* Mostrar productos filtrados */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <div key={producto.id} className="col-6 col-lg-3 mb-4">
              <div className="card">
                <img className="card-img-top" src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <h6 className="card-subtitle mb-2">{producto.descripcion}</h6>
                  <p className="card-text">${producto.precio.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
