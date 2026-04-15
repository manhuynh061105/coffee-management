import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang em đã tạo
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

// Import CSS (Đảm bảo đường dẫn đúng)
import './index.css'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Định nghĩa đường dẫn cho từng trang */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Có thể thêm trang 404 nếu muốn */}
        <Route path="*" element={<div className="text-center mt-5">404 - Không tìm thấy trang này</div>} />
      </Routes>
    </Router>
  );
}

export default App;