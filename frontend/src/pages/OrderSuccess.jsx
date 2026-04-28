import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../pages/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.order) {
      setOrderData(location.state.order);
    } else {
      const timeout = setTimeout(() => navigate('/menu'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [location, navigate]);

  return (
    <div className="page-wrapper bg-light" style={{ minHeight: '100vh' }}>
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <Header />
      </div>
      
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg text-center p-4 p-md-5 rounded-4 animate__animated animate__zoomIn mt-4">
              <div className="mb-4">
                <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '5rem' }}></i>
              </div>

              <h2 className="fw-bold text-dark mb-2">Thanh toán thành công!</h2>
              <p className="text-muted mb-4">Cảm ơn em đã tin tưởng Beans Café. Đơn hàng đang được pha chế ngay!</p>

              {orderData ? (
                <div className="bg-light p-4 rounded-3 text-start mb-4 border border-dashed">
                  <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase" style={{ color: '#6F4E37' }}>
                    Chi tiết đơn hàng
                  </h6>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Mã đơn hàng:</span>
                    <span className="fw-bold text-espresso">
                        #{orderData._id?.slice(-8).toUpperCase()}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Người nhận:</span>
                    <span className="fw-bold">{orderData.customerName}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Trạng thái:</span>
                    <span className="badge bg-success text-white px-3 rounded-pill">
                      {orderData.status === 'pending' ? 'Đã tiếp nhận' : 'Đang xử lý'}
                    </span>
                  </div>

                  <hr className="my-3" />
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Tổng thanh toán:</span>
                    <span className="fw-bold fs-4 text-danger">
                      {(orderData.totalAmount || orderData.total)?.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2 text-muted">Đang tải thông tin đơn hàng...</p>
                </div>
              )}

              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <Link to="/menu" className="btn btn-espresso px-4 py-2 rounded-pill fw-bold border-0 shadow-sm transition-hover">
                  TIẾP TỤC CHỌN MÓN
                </Link>
                <Link to="/order-history" className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold border-2 transition-hover">
                  LỊCH SỬ ĐƠN HÀNG
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