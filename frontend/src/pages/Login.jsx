import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });

      if (response.data.success) {
        // Lưu dữ liệu
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // FIX: Dùng window.location để refresh lại toàn bộ hệ thống auth
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  const styles = {
    authContainer: {
      minHeight: '100vh',
      background: "linear-gradient(rgba(44, 36, 32, 0.7), rgba(44, 36, 32, 0.8)), url('/img/banner.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
    },
    authCard: {
      background: 'rgba(255, 255, 255, 0.85)', // Hiệu ứng kính
      backdropFilter: 'blur(10px)',
      borderRadius: '25px', // Bo góc lớn hiện đại
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      maxWidth: '400px',
      width: '90%',
      margin: '0 auto',
      border: '1px solid rgba(255,255,255,0.3)'
    }
  };

  return (
    <div style={styles.authContainer}>
      <div className="container">
        <div style={styles.authCard} className="p-5 shadow-lg">
          <div className="text-center mb-4">
            <img src="/img/logo.jpg" alt="Beans Café" className="rounded-circle mb-3 shadow-sm" width="80" />
            <h3 style={{ color: '#6F4E37', fontWeight: '800' }}>CHÀO XUÂN 2026</h3>
            <p className="text-muted small">Đăng nhập để thưởng thức hương vị cà phê mới nhất</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: '#8D8078' }}>Tên đăng nhập</label>
              <input 
                type="text" 
                className="form-control border-0 bg-light py-2" 
                style={{ borderRadius: '10px' }}
                placeholder="username..." 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: '#8D8078' }}>Mật khẩu</label>
              <input 
                type="password" 
                className="form-control border-0 bg-light py-2" 
                style={{ borderRadius: '10px' }}
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" 
              className="btn w-100 py-3 fw-bold mt-3 shadow"
              style={{ 
                backgroundColor: '#6F4E37', 
                color: '#fff', 
                borderRadius: '30px',
                transition: '0.3s'
              }}>
              VÀO CỬA HÀNG
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="small">Thành viên mới? {' '}
              <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#D2691E' }}>
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;