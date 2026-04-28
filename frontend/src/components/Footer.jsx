import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-espresso pt-5 pb-4">
      <div className="container mt-4">
        <div className="row g-4">
          {/* GIỚI THIỆU */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <img
                src="/img/logo.jpg"
                alt="Logo"
                width="60"
                className="rounded-circle mb-3 border border-2 border-secondary"
              />
              <h4 className="text-white fw-bold">BEANS CAFÉ</h4>
            </div>
            <p className="text-muted-footer pe-lg-5">
              Tự hào mang đến những hạt cà phê rang xay nguyên chất, đậm đà
              hương vị truyền thống kết hợp không gian hiện đại tại trung tâm Đà
              Nẵng.
            </p>
            <div className="social-icons d-flex gap-3 mt-4">
              <button type="button" className="icon-link">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <button type="button" className="icon-link">
                <i className="fa-brands fa-instagram"></i>
              </button>
              <button type="button" className="icon-link">
                <i className="fa-brands fa-tiktok"></i>
              </button>
              <button type="button" className="icon-link">
                <i className="fa-brands fa-youtube"></i>
              </button>
            </div>
          </div>

          {/* LIÊN KẾT NHANH */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white fw-bold mb-4 position-relative footer-title">
              Khám Phá
            </h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/menu">Thực đơn</Link>
              </li>
              <li>
                <Link to="/order-history">Lịch sử mua hàng</Link>
              </li>
              <li>
                <Link to="/cart">Giỏ hàng</Link>
              </li>
            </ul>
          </div>

          {/* THÔNG TIN LIÊN HỆ & GIỜ MỞ CỬA */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-bold mb-4 position-relative footer-title">
              Liên Hệ
            </h5>
            <div className="d-flex align-items-start mb-3">
              <i className="fa-solid fa-location-dot mt-1 me-3 text-secondary"></i>
              <p className="text-muted-footer mb-0">
                Quận Hải Châu, TP Đà Nẵng
              </p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-phone me-3 text-secondary"></i>
              <a
                href="tel:0704467304"
                className="text-muted-footer text-decoration-none"
              >
                070 446 7304
              </a>
            </div>
            <div className="d-flex align-items-center mb-4">
              <i className="fa-solid fa-envelope me-3 text-secondary"></i>
              <a
                href="mailto:beanscoffee@gmail.com"
                className="text-muted-footer text-decoration-none"
              >
                beanscoffee@gmail.com
              </a>
            </div>
            <h6 className="text-white fw-bold mb-2 small">
              <i className="fa-solid fa-clock me-2 text-secondary"></i>Giờ mở
              cửa:
            </h6>
            <p className="text-muted-footer small">
              07:00 AM - 10:30 PM (Hàng ngày)
            </p>
          </div>

          {/* ĐĂNG KÝ NHẬN TIN */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-bold mb-4 position-relative footer-title">
              Hội Viên
            </h5>
            <p className="text-muted-footer small mb-4">
              Đăng ký để nhận thông báo về các loại hạt mới và ưu đãi đặc biệt.
            </p>
            <div className="newsletter-box position-relative">
              <input
                type="email"
                className="form-control newsletter-input"
                placeholder="Email của bạn..."
              />
              <button
                className="btn btn-espresso-send shadow-sm"
                aria-label="Đăng ký nhận tin"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-5 border-secondary opacity-25" />

        <div className="footer-bottom d-md-flex justify-content-between align-items-center text-center">
          <p className="text-muted-footer small mb-md-0">
            &copy; 2026 <strong>Beans Coffee</strong>. Thiết kế bởi sự đam mê.
          </p>
          <ul className="list-inline mb-0 footer-bottom-links">
            <li className="list-inline-item mx-2">
              <a href="#" className="small">
                Chính sách bảo mật
              </a>
            </li>
            <li className="list-inline-item mx-2">
              <a href="#" className="small">
                Điều khoản dịch vụ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
