import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { openAddProduct } = useModal();

  let user = null;

  try {
    const userData = localStorage.getItem("user");
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Lỗi đọc user:", error);
    user = null;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  return (
    <header className="header-custom py-2 w-100 position-fixed top-0 start-0 shadow-sm navbar navbar-expand-lg p-0">
      <div className="container d-flex justify-content-between align-items-center">
        {/* LOGO */}
        <div className="logo-section">
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src="/img/logo.jpg"
              alt="Logo"
              width="50"
              height="50"
              className="rounded-circle shadow-sm border border-2 border-white"
              style={{ objectFit: "cover" }}
            />
            <span
              className="fw-bold text-espresso ms-2 d-none d-sm-inline"
              style={{ letterSpacing: "1.5px", fontSize: "1.1rem" }}
            >
              BEANS CAFÉ
            </span>
          </Link>
        </div>

        {/* NAVIGATION GROUP - Bao gồm nút Hamburger trên Mobile */}
        <div className="d-flex align-items-center order-lg-last">
          {/* GIỎ HÀNG - Đưa ra ngoài để Mobile luôn nhìn thấy */}
          <Link
            to="/cart"
            className="position-relative d-flex align-items-center cart-wrapper px-2 me-2 me-lg-3"
          >
            <img
              src="/img/shopping-cart3.png"
              alt="Cart"
              className="cart-icon-original"
              style={{
                width: "26px",
                height: "26px",
                objectFit: "contain",
              }}
            />
            {totalItems > 0 && (
              <span className="cart-badge-custom">{totalItems}</span>
            )}
          </Link>

          {/* USER DROPDOWN */}
          <div className="dropdown ms-1 ms-md-2">
            <button
              className="btn btn-espresso-outline dropdown-toggle shadow-sm py-1 py-md-2"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-circle-user"></i>
              <span className="ms-2 d-none d-md-inline">{user ? user.username : "Tài khoản"}</span>
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3 animate-slide-in"
              aria-labelledby="userDropdown"
            >
              {user ? (
                <>
                  <li className="px-3 py-2">
                    <small
                      className="text-muted text-uppercase fw-bold"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Xin chào,
                    </small>
                    <div className="fw-bold text-espresso">{user.username}</div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item py-2" to="/order-history">
                      <i className="fa-solid fa-clock-rotate-left me-2"></i>Lịch
                      sử đơn hàng
                    </Link>
                  </li>
                  {(user.role === "admin" || user.role === 1) && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="dropdown-header text-uppercase small text-muted">
                        Quản trị
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-2 fw-bold text-primary"
                          onClick={openAddProduct}
                        >
                          <i className="fa-solid fa-plus-circle me-2"></i>Thêm
                          sản phẩm
                        </button>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item py-2 fw-bold text-success"
                          to="/admin/products"
                        >
                          <i className="fa-solid fa-boxes-stacked me-2"></i>Quản
                          lý sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item py-2 fw-bold text-danger"
                          to="/admin/dashboard"
                        >
                          <i className="fa-solid fa-chart-pie me-2"></i>
                          Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-2 text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-right-from-bracket me-2"></i>
                      Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item py-2" to="/login">
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2" to="/register">
                      Đăng ký
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* NÚT HAMBURGER (Hiện trên Mobile/Tablet) */}
          <button 
            className="navbar-toggler ms-2 p-1 border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars text-espresso fs-3"></i>
          </button>
        </div>

        {/* MENU TRANG CHỦ & MENU (Collapse) */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto pt-3 pt-lg-0">
            <li className="nav-item mb-2 mb-lg-0">
              <Link to="/" className="btn-espresso-outline mx-0 mx-lg-2 d-block d-lg-inline-block text-center">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="btn-espresso-outline mx-0 mx-lg-2 d-block d-lg-inline-block text-center">
                Menu
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;