import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-espresso pt-5 pb-4">
      <div className="container mt-4">
        <div className="row g-4">
          {/* CỘT 1: GIỚI THIỆU */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <img src="/img/logo.jpg" alt="Logo" width="60" className="rounded-circle mb-3 border border-2 border-secondary" />
              <h4 className="text-white fw-bold">BEANS CAFÉ</h4>
            </div>
            <p className="text-muted-footer pe-lg-5">
              Tự hào mang đến những hạt cà phê rang xay nguyên chất, đậm đà hương vị truyền thống kết hợp không gian hiện đại tại trung tâm Đà Nẵng.
            </p>
            <div className="social-icons d-flex gap-3 mt-4">
              <a href="#" className="icon-link"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon-link"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="icon-link"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" className="icon-link"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* CỘT 2: LIÊN KẾT NHANH */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white fw-bold mb-4 position-relative footer-title">Khám Phá</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/menu">Thực đơn</Link></li>
              <li><Link to="/order-history">Lịch sử mua hàng</Link></li>
              <li><Link to="/cart">Giỏ hàng</Link></li>
            </ul>
          </div>

          {/* CỘT 3: THÔNG TIN LIÊN HỆ & GIỜ MỞ CỬA */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-bold mb-4 position-relative footer-title">Liên Hệ</h5>
            <div className="d-flex align-items-start mb-3">
              <i className="fa-solid fa-location-dot mt-1 me-3 text-secondary"></i>
              <p className="text-muted-footer mb-0">Quận Hải Châu, TP Đà Nẵng</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-phone me-3 text-secondary"></i>
              <p className="text-muted-footer mb-0">070 446 7304</p>
            </div>
            <div className="d-flex align-items-center mb-4">
              <i className="fa-solid fa-envelope me-3 text-secondary"></i>
              <p className="text-muted-footer mb-0">beanscoffee@gmail.com</p>
            </div>
            <h6 className="text-white fw-bold mb-2 small"><i className="fa-solid fa-clock me-2 text-secondary"></i>Giờ mở cửa:</h6>
            <p className="text-muted-footer small">07:00 AM - 10:30 PM (Hàng ngày)</p>
          </div>

          {/* CỘT 4: ĐĂNG KÝ NHẬN TIN */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-bold mb-4 position-relative footer-title">Hội Viên</h5>
            <p className="text-muted-footer small mb-4">Đăng ký để nhận thông báo về các loại hạt mới và ưu đãi đặc biệt.</p>
            <div className="newsletter-box position-relative">
              <input 
                type="email" 
                className="form-control newsletter-input" 
                placeholder="Email của bạn..." 
              />
              <button className="btn btn-espresso-send shadow-sm">
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
            <li className="list-inline-item mx-2"><a href="#" className="small">Chính sách bảo mật</a></li>
            <li className="list-inline-item mx-2"><a href="#" className="small">Điều khoản dịch vụ</a></li>
          </ul>
        </div>
      </div>

      <style>{`
        .footer-espresso {
          background-color: #2C2420; /* Màu Espresso đậm */
          border-top-left-radius: 60px; /* Bo góc cực đại ở phía trên */
          border-top-right-radius: 60px;
          position: relative;
          overflow: hidden;
        }

        .text-muted-footer {
          color: #B2A296; /* Màu be nhạt cho chữ trên nền nâu */
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 30px;
          height: 2px;
          background-color: #6F4E37;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: #B2A296;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .footer-links a:hover {
          color: #FFFFFF;
          padding-left: 10px;
        }

        .icon-link {
          width: 38px;
          height: 38px;
          background-color: rgba(111, 78, 55, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B2A296;
          text-decoration: none;
          transition: 0.3s;
        }

        .icon-link:hover {
          background-color: #6F4E37;
          color: white;
          transform: translateY(-3px);
        }

        /* Newsletter Input Style */
        .newsletter-input {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1.5px solid rgba(111, 78, 55, 0.3) !important;
          border-radius: 30px !important;
          padding: 12px 60px 12px 20px !important;
          color: white !important;
        }

        .newsletter-input:focus {
          border-color: #6F4E37 !important;
          box-shadow: none !important;
        }

        .btn-espresso-send {
          position: absolute;
          right: 5px;
          top: 5px;
          bottom: 5px;
          background-color: #6F4E37;
          border: none;
          border-radius: 50%;
          width: 45px;
          color: white;
          transition: 0.3s;
        }

        .btn-espresso-send:hover {
          background-color: #A67B5B;
          transform: scale(1.05);
        }

        .footer-bottom-links a {
          color: #6F4E37;
          text-decoration: none;
        }

        .text-secondary { color: #A67B5B !important; }
      `}</style>
    </footer>
  );
};

export default Footer;