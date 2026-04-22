import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu đơn hàng được truyền từ trang Checkout sang
    if (location.state && location.state.order) {
      setOrderData(location.state.order);
    } else {
      // Nếu truy cập trực tiếp mà không có đơn hàng thì quay về trang chủ
      const timeout = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timeout);
    }
  }, [location, navigate]);

  return (
    <div className="page-wrapper bg-light" style={{ minHeight: '100vh' }}>
      <div className="bg-dark"><Header /></div>
      
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg text-center p-4 p-md-5 rounded-4">
              {/* Icon thành công */}
              <div className="mb-4">
                <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '5rem' }}></i>
              </div>

              <h2 className="fw-bold text-dark mb-2">Thanh toán thành công!</h2>
              <p className="text-muted mb-4">Cảm ơn em đã tin tưởng Beans Café. Đơn hàng của em đang được xử lý.</p>

              {orderData && (
                <div className="bg-light p-4 rounded-3 text-start mb-4 border">
                  <h6 className="fw-bold border-bottom pb-2 mb-3">CHI TIẾT ĐƠN HÀNG</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Mã đơn hàng:</span>
                    <span className="fw-bold">#{orderData._id?.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Trạng thái:</span>
                    <span className="badge bg-success-subtle text-success border border-success">
                      {orderData.status === 'pending' ? 'Đã tiếp nhận' : orderData.status}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fs-5">
                    <span className="fw-bold">Tổng thanh toán:</span>
                    <span className="fw-bold text-danger">
                      {orderData.total?.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Link to="/menu" className="btn btn-primary px-4 py-2 rounded-pill fw-bold">
                  Tiếp tục mua sắm
                </Link>
                <Link to="/" className="btn btn-outline-secondary px-4 py-2 rounded-pill">
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;