import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { openAddProduct } = useModal(); 
  
  const user = JSON.parse(localStorage.getItem('user'));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="header-custom py-2 w-100 position-fixed top-0 start-0">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* LOGO */}
        <div className="logo-section">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img src="/img/logo.jpg" alt="Logo" width="55" height="55" className="rounded-circle shadow-sm border border-2 border-white" style={{ objectFit: 'cover' }} />
            <span className="fw-bold text-espresso ms-2 d-none d-md-inline" style={{ letterSpacing: '1.5px', fontSize: '1.1rem' }}>
              BEANS CAFÉ
            </span>
          </Link>
        </div>

        {/* NAVIGATION GROUP */}
        <div className="d-flex align-items-center">
          <nav className="d-none d-lg-block me-3">
            <ul className="nav align-items-center mb-0">
              <li className="nav-item">
                {/* HIỆU ỨNG Y HỆT NÚT USER */}
                <Link to="/" className="btn-espresso-outline ms-2">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link to="/menu" className="btn-espresso-outline ms-2">Menu</Link>
              </li>
              
              {/* GIỎ HÀNG */}
              <li className="nav-item ms-3">
                <Link to="/cart" className="position-relative d-flex align-items-center cart-wrapper px-2">
                  <img 
                    src="/img/shopping-cart3.png" 
                    alt="Cart"
                    className="cart-icon-original" 
                    style={{ width: '28px', height: '28px', objectFit: 'contain' }} 
                  />
                  {totalItems > 0 && (
                    <span className="cart-badge-custom">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* USER DROPDOWN */}
          <div className="dropdown ms-2">
            <button 
              className="btn btn-espresso-outline dropdown-toggle shadow-sm" 
              type="button" 
              id="userDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i className="fa-solid fa-circle-user me-2"></i>
              <span>{user ? user.username : 'Tài khoản'}</span>
            </button>
            
            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3 animate-slide-in" aria-labelledby="userDropdown">
              {user ? (
                <>
                  <li className="px-3 py-2">
                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Xin chào,</small>
                    <div className="fw-bold text-espresso">{user.username}</div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item py-2" to="/order-history">
                      <i className="fa-solid fa-clock-rotate-left me-2"></i>Lịch sử đơn hàng
                    </Link>
                  </li>
                  {user.role === 'admin' && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li className="dropdown-header text-uppercase small text-muted">Quản trị</li>
                      <li>
                        <button className="dropdown-item py-2 fw-bold text-primary" onClick={openAddProduct}>
                          <i className="fa-solid fa-plus-circle me-2"></i>Thêm sản phẩm
                        </button>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-bold text-success" to="/admin/products">
                          <i className="fa-solid fa-boxes-stacked me-2"></i>Quản lý sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-bold text-danger" to="/admin/dashboard">
                          <i className="fa-solid fa-chart-pie me-2"></i>Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-2"></i>Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item py-2" to="/login">Đăng nhập</Link></li>
                  <li><Link className="dropdown-item py-2" to="/register">Đăng ký</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .header-custom {
          /* Tăng độ đặc của nền và thêm bóng đổ để tách biệt với background */
          background-color: rgba(255, 255, 255, 0.98); 
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(111, 78, 55, 0.15);
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.08); /* Đổ bóng tách nền */
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .text-espresso { color: #6F4E37; }

        /* NÚT CHUNG CHO TRANG CHỦ, MENU, USER (STYLE Y HỆT NHAU) */
        .btn-espresso-outline {
          background-color: transparent !important;
          color: #6F4E37 !important;
          text-decoration: none;
          font-weight: 700;
          padding: 8px 22px;
          border-radius: 25px;
          border: 2px solid #6F4E37 !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.9rem;
          cursor: pointer;
        }

        .btn-espresso-outline:hover {
          background-color: #6F4E37 !important; /* Lấp đầy màu nâu */
          color: #FFFFFF !important; /* Chữ trắng */
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(111, 78, 55, 0.25);
        }
        
        .btn-espresso-outline::after { display: none; } /* Xóa mũi tên mặc định của dropdown bootstrap */

        /* ICON GIỎ HÀNG */
        .cart-icon-original {
          filter: sepia(100%) hue-rotate(350deg) saturate(300%) brightness(50%);
          transition: all 0.3s ease;
        }

        .cart-wrapper:hover .cart-icon-original {
          filter: sepia(100%) hue-rotate(350deg) saturate(500%) brightness(30%);
          transform: scale(1.15);
        }

        .cart-badge-custom {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #6F4E37;
          color: white;
          font-size: 0.65rem;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .dropdown-menu {
          border-radius: 18px;
          padding: 10px;
          min-width: 230px;
          border: none;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }

        .dropdown-item {
          border-radius: 10px;
          transition: 0.2s;
          font-weight: 600;
          color: #5D4037;
        }

        .dropdown-item:hover {
          background-color: #FDF8F5;
          color: #6F4E37;
          transform: translateX(5px);
        }

        .animate-slide-in {
          animation: slideIn 0.2s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Header;