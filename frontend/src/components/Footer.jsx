import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Về Chúng Tôi</h5>
            <p>Địa chỉ: Quận Hải Châu, TP Đà Nẵng</p>
          </div>
          <div className="col-md-4">
            <h5>Đăng ký hội viên</h5>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email của bạn..." />
              <button type="button" className="btn btn-primary">Gửi</button>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Thông tin liên hệ</h5>
            <p>Điện thoại: 070 446 7304</p>
            <p>Email: beanscoffee@gmail.com</p>
          </div>
        </div>
        <hr />
        <div className="text-center mt-4">
          <p className="text-light">&copy; 2026 Beans Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;