import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext'; // 1. Import useModal

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { openAddProduct } = useModal(); // 2. Lấy hàm mở Pop-up
  
  const user = JSON.parse(localStorage.getItem('user'));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="py-3 w-100 position-fixed top-0 start-0" style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Nền trắng trong suốt
          backdropFilter: 'blur(15px)',                // Hiệu ứng kính mờ
          borderBottom: '1px solid rgba(111, 78, 55, 0.1)', 
          zIndex: 1000 
        }}>
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* LOGO */}
        <div className="logo">
          <Link to="/" className="d-block">
            <img src="/img/logo.jpg" alt="Logo" width="60" className="rounded" style={{ objectFit: 'cover' }} />
          </Link>
        </div>

        {/* NAVIGATION GROUP */}
        <div className="d-flex align-items-center">
          <ul className="nav align-items-center mb-0 d-flex">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white fw-bold nav-link-custom px-0">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link text-white fw-bold nav-link-custom px-0">Menu</Link>
            </li>
            
            {/* GIỎ HÀNG */}
            <li className="nav-item d-flex align-items-center ms-2">
              <Link to="/cart" className="position-relative d-flex align-items-center cart-wrapper">
                <img 
                  src="/img/shopping-cart3.png" 
                  alt="Cart"
                  className="cart-icon" 
                  style={{ width: '26px', height: '26px', objectFit: 'contain' }} 
                />
                {totalItems > 0 && (
                  <span 
                    className="badge bg-danger rounded-pill position-absolute"
                    style={{ 
                      fontSize: '0.65rem', 
                      top: '-8px', 
                      right: '-12px',
                      padding: '3px 6px'
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          <div className="dropdown ms-5">
            <button 
              className="btn btn-outline-light rounded-pill px-4 py-2 dropdown-toggle d-flex align-items-center" 
              style={{ fontSize: '0.9rem', fontWeight: '600' }}
              type="button" 
              id="userDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i className="fa-solid fa-user me-2"></i>
              {user ? user.username : 'Tài khoản'}
            </button>
            
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userDropdown">
              {user ? (
                <>
                  <li>
                    <Link className="dropdown-item py-2 fw-bold text-dark" to="/order-history">
                      <i className="fa-solid fa-clock-rotate-left me-2 text-primary"></i>Lịch sử đơn hàng
                    </Link>
                  </li>

                  {user.role === 'admin' && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li className="dropdown-header text-uppercase small text-muted">Quản trị</li>
                      
                      {/* THAY ĐỔI TẠI ĐÂY: Dùng button để gọi Modal thay vì Link */}
                      <li>
                        <button 
                          className="dropdown-item py-2 fw-bold text-primary border-0 bg-transparent w-100 text-start" 
                          onClick={openAddProduct}
                        >
                          <i className="fa-solid fa-plus-circle me-2"></i>Thêm sản phẩm
                        </button>
                      </li>

                      <li>
                        <Link className="dropdown-item py-2 fw-bold text-success" to="/admin/products">
                          <i className="fa-solid fa-pen-to-square me-2"></i>Quản lý sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-bold text-danger" to="/admin/dashboard">
                          <i className="fa-solid fa-chart-line me-2"></i>Dashboard
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
        .nav {
          gap: 35px;
        }
        .nav-link-custom {
          color: #2C2420 !important; /* Màu Dark Chocolate */
          font-size: 1rem;
          font-weight: 600 !important;
          transition: all 0.3s ease;
        }
        .nav-link-custom:hover {
          color: #6F4E37 !important; /* Màu Coffee Brown */
          transform: translateY(-2px);
        }
        .cart-icon {
          filter: brightness(0) saturate(100%) invert(18%) sepia(13%) saturate(1131%) hue-rotate(338deg) brightness(96%) contrast(89%); /* Đổi icon sang màu nâu */
          transition: transform 0.3s ease;
        }
        .cart-wrapper:hover .cart-icon {
          transform: scale(1.15);
        }
        .dropdown-menu {
          border-radius: 15px !important;
          border: none !important;
          box-shadow: 0 10px 30px rgba(44, 36, 32, 0.1) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;