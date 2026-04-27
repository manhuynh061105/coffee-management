import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop'; 

// Import các trang
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import AdminProducts from './pages/AdminProducts';
import AdminDashboard from './pages/AdminDashboard';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout'; 
import OrderSuccess from './pages/OrderSuccess'; 
import OrderHistory from './pages/OrderHistory';

// Import Component bảo vệ
import AdminRoute from './components/AdminRoute';

import './index.css'; 

// --- Component bảo vệ dành cho User đã đăng nhập ---
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <ScrollToTop /> 

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* --- Protected User Routes (Phải đăng nhập mới thấy) --- */}
        <Route path="/checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        <Route path="/order-success" element={
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        } />
        <Route path="/order-history" element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        } />
        
        {/* --- Admin Routes --- */}
        <Route 
          path="/admin/add-product" 
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          } 
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        
        {/* Trang 404 - Làm đẹp hơn một chút */}
        <Route path="*" element={
          <div className="text-center mt-5 py-5">
            <h1 className="display-1 fw-bold" style={{ color: '#6F4E37' }}>404</h1>
            <p className="fs-3 text-muted">Hương vị này chúng tôi chưa tìm thấy!</p>
            <a href="/" className="btn btn-espresso rounded-pill px-4 text-white" style={{ backgroundColor: '#6F4E37' }}>
              Quay về Trang chủ
            </a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;