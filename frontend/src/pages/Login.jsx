import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import api from '../configs/api'; 
import "../pages/Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        toast.success('Đăng nhập thành công! Chào mừng bạn quay lại.');
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại! Vui lòng kiểm tra lại.');
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card p-4 p-md-5">
          <div className="text-center mb-5">
            <div className="logo-wrapper bounce-in mb-3">
              <img src="/img/logo.jpg" alt="Beans Café" className="rounded-circle shadow" width="90" height="90" />
            </div>
            <h2 className="fw-black text-espresso mb-1">ĐĂNG NHẬP</h2>
            <div className="mx-auto" style={{ width: '40px', height: '3px', backgroundColor: '#6F4E37', borderRadius: '10px' }}></div>
            <p className="text-muted small mt-3 px-4">Chào mừng bạn trở lại với hương vị cà phê đích thực</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label-custom">Tên đăng nhập</label>
              <div className="input-group-custom">
                <span className="input-icon"><i className="fa-solid fa-user"></i></span>
                <input 
                  type="text" 
                  className="form-control-custom" 
                  placeholder="Nhập username..." 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label-custom">Mật khẩu</label>
              <div className="input-group-custom">
                <span className="input-icon"><i className="fa-solid fa-lock"></i></span>
                <input 
                  type="password" 
                  className="form-control-custom" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-espresso shadow-lg">
              VÀO CỬA HÀNG <i className="fa-solid fa-arrow-right-to-bracket ms-2"></i>
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="small text-muted">
              Bạn chưa có tài khoản? {' '}
              <Link to="/register" className="fw-bold text-decoration-none color-accent-coffee">
                Đăng ký thành viên
              </Link>
            </p>
            <Link to="/" className="text-muted small text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;