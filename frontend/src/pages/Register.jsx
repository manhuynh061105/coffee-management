import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  // Cập nhật state chung cho các input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 1. Kiểm tra khớp mật khẩu ngay tại Frontend
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username: formData.username,
        password: formData.password
      });

      if (response.data.success) {
        alert('Đăng ký thành công! Hãy đăng nhập nhé.');
        navigate('/login'); // Chuyển sang trang đăng nhập
      }
    } catch (error) {
      console.error('Register error:', error);
      alert(error.response?.data?.message || 'Đăng ký thất bại!');
    }
  };

  // Đồng bộ style với trang Login
  const styles = {
    authContainer: {
      minHeight: '100vh',
      background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/img/banner.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
    },
    authCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      maxWidth: '420px',
      width: '100%',
      margin: '0 auto',
    },
    logoAuth: {
      maxWidth: '150px',
    }
  };

  return (
    <div style={styles.authContainer}>
      <div className="container">
        <div style={styles.authCard} className="p-5 mx-auto">
          <div className="text-center mb-4">
            <img src="/img/logo.jpg" alt="Beans Café" style={styles.logoAuth} className="mb-3" />
            <h3 className="text-primary fw-bold">Đăng Ký Tài Khoản</h3>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Tên đăng nhập</label>
              <input 
                type="text" 
                id="username"
                className="form-control" 
                placeholder="Nhập tên đăng nhập" 
                value={formData.username}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input 
                type="password" 
                id="password"
                className="form-control" 
                placeholder="Ít nhất 6 ký tự" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                id="confirmPassword"
                className="form-control" 
                placeholder="Nhập lại mật khẩu" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-pill">
              ĐĂNG KÝ NGAY
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="mb-0">Đã có tài khoản?{' '}
              <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;