import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        
        {/* --- BƯỚC 2: THÊM ROUTE CHECKOUT Ở ĐÂY --- */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
        
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
        
        {/* Trang 404 */}
        <Route path="*" element={
          <div className="text-center mt-5">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="fs-3">Rất tiếc, trang này không tồn tại!</p>
            <a href="/" className="btn btn-primary">Quay về Trang chủ</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;