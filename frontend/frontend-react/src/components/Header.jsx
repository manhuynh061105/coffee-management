import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  // Lấy dữ liệu user từ LocalStorage an toàn
  const user = JSON.parse(localStorage.getItem('user'));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="py-2 shadow-sm w-100" style={{ backgroundColor: '#1a1a1a', zIndex: 1000 }}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <img src="/img/logo.jpg" alt="Logo" width="80" className="rounded" />
          </Link>
        </div>

        {/* NAVIGATION */}
        <ul className="nav pe-4 align-items-center mb-0">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white small fw-bold nav-link-custom">Trang chủ</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link text-white small fw-bold nav-link-custom">Menu</Link>
          </li>
          
          {/* GIỎ HÀNG */}
          <li className="nav-item mx-3">
            <Link to="/cart" className="position-relative d-inline-block cart-wrapper">
              <img 
                src="/img/shopping-cart3.png" 
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

          {/* DROPDOWN TÀI KHOẢN (Đã sửa lỗi hiển thị) */}
          <div className="dropdown">
            <button 
              className="btn btn-sm btn-outline-light rounded-pill px-3 dropdown-toggle d-flex align-items-center" 
              type="button" 
              id="userDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i className="fa-solid fa-user me-2"></i>
              {user ? user.username : 'Tài khoản'}
            </button>
            
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
              {user ? (
                <>
                  {/* Dành riêng cho ADMIN */}
                  {user.role === 'admin' && (
                    <>
                      <li>
                        <Link className="dropdown-item fw-bold text-primary" to="/admin/add-product">
                          <i className="fa-solid fa-plus-circle me-2"></i>Thêm sản phẩm
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                    </>
                  )}
                  
                  {/* Dành cho mọi User đã đăng nhập */}
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-2"></i>Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Khi chưa đăng nhập */}
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