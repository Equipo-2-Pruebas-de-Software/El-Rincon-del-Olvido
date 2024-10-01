import React, { useState, useEffect } from 'react';
import ProductList from './ProductList'; // Tu lista de productos
import { useLocation, useNavigate } from 'react-router-dom'; // Reemplazamos useHistory por useNavigate

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductsPage = () => {
  // Estados para los valores aplicados de los filtros
  const [filter, setFilter] = useState('all'); // Filtro por categoría
  const [searchQuery, setSearchQuery] = useState(''); // Búsqueda por nombre o descripción
  const [minPrice, setMinPrice] = useState(0); // Precio mínimo aplicado
  const [maxPrice, setMaxPrice] = useState(120000); // Precio máximo aplicado
  const [selectedTallas, setSelectedTallas] = useState([]); // Filtro por tallas aplicadas (array)

  // Estados temporales para los filtros antes de aplicar
  const [tempFilter, setTempFilter] = useState('all'); 
  const [tempMinPrice, setTempMinPrice] = useState(0); 
  const [tempMaxPrice, setTempMaxPrice] = useState(120000);
  const [tempTallas, setTempTallas] = useState([]); // Array temporal de tallas seleccionadas

  const query = useQuery(); // Hook para obtener los parámetros de la URL
  const navigate = useNavigate(); // Reemplazamos useHistory por useNavigate

  useEffect(() => {
    const search = query.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [query]);

  // Actualizar los valores temporales cuando se cambia un filtro
  const handleTempFilterChange = (category) => {
    setTempFilter(category);
  };

  const handleTempMinPriceChange = (e) => {
    setTempMinPrice(parseInt(e.target.value, 10));
  };

  const handleTempMaxPriceChange = (e) => {
    setTempMaxPrice(parseInt(e.target.value, 10));
  };

  // Manejar cambios en las tallas seleccionadas
  const handleTempTallaChange = (talla) => {
    setTempTallas((prevTallas) =>
      prevTallas.includes(talla)
        ? prevTallas.filter((t) => t !== talla) // Eliminar si ya está seleccionada
        : [...prevTallas, talla] // Añadir si no está seleccionada
    );
  };

  // Aplicar los filtros cuando se hace clic en el botón
  const handleApplyFilters = () => {
    setFilter(tempFilter);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setSelectedTallas(tempTallas); // Aplicamos las tallas seleccionadas

    // Construimos los parámetros de búsqueda para la URL
    const queryParams = new URLSearchParams();

    if (tempFilter !== 'all') queryParams.set('category', tempFilter);
    if (tempMinPrice > 0) queryParams.set('minPrice', tempMinPrice);
    if (tempMaxPrice < 120000) queryParams.set('maxPrice', tempMaxPrice);
    if (tempTallas.length > 0) queryParams.set('tallas', tempTallas.join(',')); // Tallas múltiples

    // Redirigimos con los nuevos parámetros
    navigate({
      pathname: '/productos',
      search: queryParams.toString(),
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Nuestros Productos</h1>

      <div className="row">
        {/* Filtros en la columna izquierda */}
        <div className="col-md-3">
          <div className="filters mb-4">
            <h5>Filtrar por Categoría</h5>
            <button
              className={`btn ${tempFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'} w-100 mb-2`}
              onClick={() => handleTempFilterChange('all')}
            >
              Todos
            </button>
            <button
              className={`btn ${tempFilter === 'men' ? 'btn-primary' : 'btn-outline-primary'} w-100 mb-2`}
              onClick={() => handleTempFilterChange('men')}
            >
              Hombres
            </button>
            <button
              className={`btn ${tempFilter === 'women' ? 'btn-primary' : 'btn-outline-primary'} w-100 mb-2`}
              onClick={() => handleTempFilterChange('women')}
            >
              Mujeres
            </button>

            {/* Filtros por precio con barras deslizantes */}
            <div className="mb-3">
              <h5>Rango de Precios</h5>
              <label htmlFor="minPriceRange">Precio Mínimo: ${tempMinPrice}</label>
              <input
                type="range"
                id="minPriceRange"
                className="form-range"
                min="0"
                max="120000"
                step="1000"
                value={tempMinPrice}
                onChange={handleTempMinPriceChange}
              />

              <label htmlFor="maxPriceRange">Precio Máximo: ${tempMaxPrice}</label>
              <input
                type="range"
                id="maxPriceRange"
                className="form-range"
                min="0"
                max="120000"
                step="1000"
                value={tempMaxPrice}
                onChange={handleTempMaxPriceChange}
              />
            </div>

            {/* Filtro por tallas con selección múltiple */}
            <div className="mb-3">
              <h5>Filtrar por Talla</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="S"
                  id="tallaS"
                  onChange={() => handleTempTallaChange('S')}
                  checked={tempTallas.includes('S')}
                />
                <label className="form-check-label" htmlFor="tallaS">
                  S
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="M"
                  id="tallaM"
                  onChange={() => handleTempTallaChange('M')}
                  checked={tempTallas.includes('M')}
                />
                <label className="form-check-label" htmlFor="tallaM">
                  M
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="L"
                  id="tallaL"
                  onChange={() => handleTempTallaChange('L')}
                  checked={tempTallas.includes('L')}
                />
                <label className="form-check-label" htmlFor="tallaL">
                  L
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="XL"
                  id="tallaXL"
                  onChange={() => handleTempTallaChange('XL')}
                  checked={tempTallas.includes('XL')}
                />
                <label className="form-check-label" htmlFor="tallaXL">
                  XL
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="XXL"
                  id="tallaXXL"
                  onChange={() => handleTempTallaChange('XXL')}
                  checked={tempTallas.includes('XXL')}
                />
                <label className="form-check-label" htmlFor="tallaXXL">
                  XXL
                </label>
              </div>
            </div>

            {/* Botón para aplicar filtros */}
            <div className="d-grid">
              <button className="btn btn-success" onClick={handleApplyFilters}>
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de productos filtrados a la derecha */}
        <div className="col-md-9">
          <ProductList
            filter={filter}
            searchName={searchQuery}
            minPrice={minPrice}
            maxPrice={maxPrice}
            selectedTallas={selectedTallas} // Pasamos las tallas seleccionadas
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
