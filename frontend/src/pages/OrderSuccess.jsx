import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Kiểm tra dữ liệu từ location.state
    if (location.state && location.state.order) {
      setOrderData(location.state.order);
    } else {
      // Nếu không có dữ liệu đơn hàng (truy cập lén hoặc F5), về menu sau 3s
      const timeout = setTimeout(() => navigate('/menu'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [location, navigate]);

  return (
    <div className="page-wrapper bg-light" style={{ minHeight: '100vh' }}>
      <div className="bg-dark"><Header /></div>
      
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg text-center p-4 p-md-5 rounded-4 animate__animated animate__zoomIn">
              <div className="mb-4">
                <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '5rem' }}></i>
              </div>

              <h2 className="fw-bold text-dark mb-2">Thanh toán thành công!</h2>
              <p className="text-muted mb-4">Cảm ơn em đã tin tưởng Beans Café. Đơn hàng đang được pha chế ngay!</p>

              {orderData && (
                <div className="bg-light p-4 rounded-3 text-start mb-4 border border-dashed">
                  <h6 className="fw-bold border-bottom pb-2 mb-3 text-uppercase">Chi tiết đơn hàng</h6>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Mã đơn hàng:</span>
                    <span className="fw-bold text-espresso">#{orderData._id?.slice(-8).toUpperCase()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Người nhận:</span>
                    <span className="fw-bold">{orderData.customerName}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Trạng thái:</span>
                    <span className="badge bg-success text-white">
                      {orderData.status === 'pending' ? 'Đã tiếp nhận' : orderData.status}
                    </span>
                  </div>

                  <hr />
                  
                  <div className="d-flex justify-content-between fs-5">
                    <span className="fw-bold">Tổng thanh toán:</span>
                    <span className="fw-bold text-danger">
                      {/* SỬA TẠI ĐÂY: Dùng totalAmount thay vì total */}
                      {(orderData.totalAmount || orderData.total)?.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <Link to="/menu" className="btn btn-espresso px-4 py-2 rounded-pill fw-bold" style={{ backgroundColor: '#6F4E37', color: '#fff' }}>
                  Tiếp tục mua sắm
                </Link>
                <Link to="/order-history" className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold">
                  Xem lịch sử đơn hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      <style>{`
        .text-espresso { color: #6F4E37; }
        .btn-espresso:hover { background-color: #2C2420 !important; }
      `}</style>
    </div>
  );
};

export default OrderSuccess;