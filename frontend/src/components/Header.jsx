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
    window.location.href = '/login';
  };

  return (
    // 1. Tăng py-1 lên py-2 hoặc py-3 để Header to lên theo chiều dọc
    <header className="py-2 shadow-sm w-100 position-fixed top-0 start-0" style={{ backgroundColor: '#1a1a1a', zIndex: 1000 }}>
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* LOGO - Tăng nhẹ kích thước logo */}
        <div className="logo">
          <Link to="/" className="d-block">
            <img src="/img/logo.jpg" alt="Logo" width="60" className="rounded" style={{ objectFit: 'cover' }} />
          </Link>
        </div>

        {/* NAVIGATION GROUP */}
        <div className="d-flex align-items-center">
          {/* 2. Dùng gap-4 để giãn đều các li trong ul */}
          <ul className="nav align-items-center mb-0 d-flex style={{ gap: '25px' }}">
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

          {/* 3. Dùng ms-5 (margin start) để đẩy cụm User ra xa cụm Menu */}
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
                  {user.role === 'admin' && (
                    <li>
                      <Link className="dropdown-item py-2 fw-bold text-primary" to="/admin/add-product">
                        <i className="fa-solid fa-plus-circle me-2"></i>Thêm sản phẩm
                      </Link>
                    </li>
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

      {/* Inline CSS để giãn các item trong Nav dễ dàng hơn */}
      <style>{`
        .nav {
          gap: 30px; /* Giãn khoảng cách giữa Trang chủ, Menu và Cart */
        }
        .nav-link-custom {
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }
      `}</style>
    </header>
  );
};

export default Header;