import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem('user'));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Không cần xóa cart_id trong local, để dành lần sau user đó quay lại
    window.location.href = '/login';
  };

  return (
    // Thêm style nhỏ gọn và tránh đè nội dung
    <header className="py-2 shadow-sm w-100" style={{ backgroundColor: '#1a1a1a', zIndex: 1000 }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo">
          <Link to="/">
            {/* Giảm kích thước logo một chút cho gọn */}
            <img src="/img/logo.jpg" alt="Logo" width="80" className="rounded" />
          </Link>
        </div>

        <ul className="nav pe-4 align-items-center mb-0">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white small fw-bold nav-link-custom">Trang chủ</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link text-white small fw-bold nav-link-custom">Menu</Link>
          </li>
          
          {/* ICON GIỎ HÀNG DÙNG ẢNH PNG */}
          <li className="nav-item mx-3">
            <Link to="/cart" className="position-relative d-inline-block cart-wrapper">
              <img 
                src="/img/shopping-cart3.png" // Em hãy đảm bảo có file này trong public/img/
                alt="Cart"
                className="cart-icon" 
                style={{ width: '30px', height: '30px', objectFit: 'contain' }} 
              />
              {totalItems > 0 && (
                <span 
                  className="badge bg-danger rounded-pill position-absolute"
                  style={{ 
                    fontSize: '0.65rem', 
                    top: '-5px', 
                    right: '-10px',
                    padding: '3px 6px'
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </li>

          <div className="profile dropdown">
            <button 
              type="button" 
              className="dropdown-toggle btn btn-sm btn-outline-light rounded-pill px-3" 
              data-bs-toggle="dropdown"
            >
              <i className="fa-solid fa-user me-1"></i>
              {user ? user.username : 'Tài khoản'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {user ? (
                <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/login">Đăng nhập</Link></li>
                  <li><Link className="dropdown-item" to="/register">Đăng ký</Link></li>
                </>
              )}
            </ul>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;