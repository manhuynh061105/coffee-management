import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // 1. Khởi tạo State để lưu trữ dữ liệu nhập vào
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 2. Logic xử lý Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });

      // Kiểm tra success dựa trên format Backend của em
      if (response.data.success) {
        // Lưu token và user vào localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        alert('Chào mừng bạn quay trở lại!');
        navigate('/'); // Chuyển hướng về trang chủ
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    }
  };

  // 3. Style CSS được chuyển sang Object (React Style)
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
            <h3 className="text-primary fw-bold">Đăng Nhập</h3>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Tên đăng nhập</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập tên đăng nhập" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Ghi nhớ tôi</label>
              </div>
              <a href="#" className="text-primary text-decoration-none small">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-pill">
              ĐĂNG NHẬP
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="mb-0">Chưa có tài khoản?{' '}
              <Link to="/register" className="text-primary fw-semibold text-decoration-none">
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