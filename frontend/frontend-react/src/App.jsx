import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct'; // Trang mới

// Import Component bảo vệ
import AdminRoute from './components/AdminRoute'; // Component check role admin

// Import CSS
import './index.css'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes (Ai cũng vào được) --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* --- Admin Routes (Chỉ Admin mới vào được) --- */}
        <Route 
          path="/admin/add-product" 
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          } 
        />
        
        {/* Trang Menu (Nếu em sắp làm) */}
        <Route path="/menu" element={<div className="text-center mt-5">Trang Menu đang phát triển...</div>} />

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