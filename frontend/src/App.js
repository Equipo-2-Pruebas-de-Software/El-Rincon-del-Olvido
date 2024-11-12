// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRouter from './components/AdminRouter';
import Header from './components/Header';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import AuthPage from './components/AuthPage';
import AdvancedSearch from './components/AdvancedSearch';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminProductEdit from './components/AdminProductEdit';
import { UserProvider } from './context/UserContext';
import AdminReport from './components/AdminReport';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <main style={{ paddingBottom: '50px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/busqueda-avanzada" element={<AdvancedSearch />} />
            <Route path="/reporte" element={<AdminReport />} />

            {/* Rutas protegidas para el administrador */}
            <Route element={<AdminRouter />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/product/:id" element={<AdminProductEdit />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
