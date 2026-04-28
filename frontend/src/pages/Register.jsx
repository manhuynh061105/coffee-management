import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../configs/api'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user' 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Chỉ cập nhật nếu độ dài username <= 20
    if (e.target.id === 'username' && e.target.value.length > 20) return;

    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const toggleRole = () => {
    setFormData({
      ...formData,
      role: formData.role === 'user' ? 'admin' : 'user'
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài lần cuối
    if (formData.username.length > 20) {
      alert("Tên đăng nhập không được vượt quá 20 ký tự!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        username: formData.username,
        password: formData.password,
        role: formData.role
      });

      if (response.data.success) {
        alert('Chào mừng bạn đến với Beans Café! Đăng ký thành công.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Đăng ký thất bại! Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="logo-wrapper bounce-in mb-3">
              <img src="/img/logo.jpg" alt="Beans Café" className="rounded-circle shadow" width="80" height="80" />
            </div>
            <h2 className="fw-black text-espresso mb-1">GIA NHẬP BEANS</h2>
            <div className="mx-auto" style={{ width: '40px', height: '3px', backgroundColor: '#6F4E37', borderRadius: '10px' }}></div>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label-custom mb-0">Tên đăng nhập</label>
                <span className={`small ${formData.username.length >= 18 ? 'text-danger' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                  {formData.username.length}/20
                </span>
              </div>
              <div className="input-group-custom">
                <span className="input-icon"><i className="fa-solid fa-user-plus"></i></span>
                <input 
                  type="text" id="username" className="form-control-custom" 
                  placeholder="Ví dụ: nhuman123..." 
                  value={formData.username} 
                  onChange={handleChange} 
                  maxLength={20} // Giới hạn trực tiếp trên HTML
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Mật khẩu</label>
              <div className="input-group-custom">
                <span className="input-icon"><i className="fa-solid fa-key"></i></span>
                <input 
                  type="password" id="password" className="form-control-custom" 
                  placeholder="Ít nhất 6 ký tự" 
                  value={formData.password} onChange={handleChange} required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label-custom">Xác nhận mật khẩu</label>
              <div className="input-group-custom">
                <span className="input-icon"><i className="fa-solid fa-shield-check"></i></span>
                <input 
                  type="password" id="confirmPassword" className="form-control-custom" 
                  placeholder="Nhập lại mật khẩu" 
                  value={formData.confirmPassword} onChange={handleChange} required 
                />
              </div>
            </div>

            <div className="mb-4 text-center">
              <label className="form-label-custom mb-3">Bạn tham gia với vai trò?</label>
              <div className="role-switch-container shadow-sm mx-auto" onClick={toggleRole}>
                <div className={`role-slider ${formData.role}`}></div>
                <div className={`role-label left ${formData.role === 'user' ? 'active' : ''}`}>Khách hàng</div>
                <div className={`role-label right ${formData.role === 'admin' ? 'active' : ''}`}>Quản trị</div>
              </div>
            </div>

            <button type="submit" className="btn-auth-espresso shadow-lg">
              TẠO TÀI KHOẢN <i className="fa-solid fa-mug-hot ms-2"></i>
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="small text-muted">
              Đã là thành viên? {' '}
              <Link to="/login" className="fw-bold text-decoration-none color-accent-coffee">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          background: linear-gradient(rgba(44, 36, 32, 0.65), rgba(44, 36, 32, 0.75)), url('/img/banner.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(15px);
          border-radius: 40px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          max-width: 450px;
          width: 100%;
          margin: 20px auto;
          border: 1px solid rgba(255,255,255,0.4);
          animation: slideInRight 0.6s ease-out;
        }

        .text-espresso { color: #3E2723; }
        .fw-black { font-weight: 900; letter-spacing: 1px; }

        .form-label-custom {
          font-size: 0.85rem;
          font-weight: 700;
          color: #5D4037;
          margin-bottom: 8px;
          display: block;
        }

        .input-group-custom { position: relative; }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #A67B5B;
          z-index: 5;
        }

        .form-control-custom {
          width: 100%;
          padding: 10px 15px 10px 45px;
          border-radius: 15px;
          border: 1.5px solid #EFEBE9;
          background-color: #FDFBFA;
          transition: all 0.3s ease;
        }

        .form-control-custom:focus {
          outline: none;
          border-color: #6F4E37;
          box-shadow: 0 0 0 4px rgba(111, 78, 55, 0.1);
        }

        .role-switch-container {
          width: 260px;
          height: 45px;
          background: #EFEBE9;
          border-radius: 25px;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 5px;
          user-select: none;
        }

        .role-slider {
          position: absolute;
          width: 125px;
          height: 35px;
          background: #6F4E37;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .role-slider.user { left: 5px; }
        .role-slider.admin { left: 130px; }

        .role-label {
          flex: 1;
          z-index: 2;
          font-size: 0.85rem;
          font-weight: 700;
          transition: 0.3s;
          color: #8D8078;
        }

        .role-label.active { color: #FFFFFF; }

        .btn-auth-espresso {
          width: 100%;
          background-color: #6F4E37;
          color: #FFFFFF;
          border: none;
          padding: 15px;
          border-radius: 18px;
          font-weight: 800;
          transition: all 0.3s;
        }

        .btn-auth-espresso:hover {
          background-color: #3E2723;
          transform: translateY(-2px);
        }

        .color-accent-coffee { color: #D2691E; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Register;