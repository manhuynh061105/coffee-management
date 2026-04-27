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
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card p-4 p-md-5">
          {/* Header của Card */}
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

      <style>{`
        .auth-container {
          min-height: 100vh;
          background: linear-gradient(rgba(44, 36, 32, 0.65), rgba(44, 36, 32, 0.75)), url('/img/banner.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          align-items: center;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border-radius: 40px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          max-width: 450px;
          width: 100%;
          margin: 20px auto;
          border: 1px solid rgba(255,255,255,0.4);
          animation: slideUp 0.6s ease-out;
        }

        .text-espresso { color: #3E2723; }
        .fw-black { font-weight: 900; letter-spacing: 1px; }

        .form-label-custom {
          font-size: 0.85rem;
          font-weight: 700;
          color: #5D4037;
          margin-bottom: 8px;
          display: block;
          padding-left: 5px;
        }

        .input-group-custom {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          color: #A67B5B;
          z-index: 5;
        }

        .form-control-custom {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border-radius: 15px;
          border: 1.5px solid #EFEBE9;
          background-color: #FDFBFA;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .form-control-custom:focus {
          outline: none;
          border-color: #6F4E37;
          background-color: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(111, 78, 55, 0.1);
        }

        .btn-auth-espresso {
          width: 100%;
          background-color: #6F4E37;
          color: #FFFFFF;
          border: none;
          padding: 15px;
          border-radius: 18px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-top: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-auth-espresso:hover {
          background-color: #3E2723;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(62, 39, 35, 0.3);
        }

        .color-accent-coffee { color: #D2691E; }
        .color-accent-coffee:hover { color: #6F4E37; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bounce-in {
          animation: bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounce {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login;