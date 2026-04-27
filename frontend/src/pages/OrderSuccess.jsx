import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // 1. Kiểm tra dữ liệu từ location.state (được truyền từ trang Checkout sang)
    if (location.state && location.state.order) {
      setOrderData(location.state.order);
    } else {
      // Nếu không có dữ liệu đơn hàng (truy cập lén hoặc F5), tự động về menu sau 3s
      const timeout = setTimeout(() => navigate('/menu'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [location, navigate]);

  return (
    <div className="page-wrapper bg-light" style={{ minHeight: '100vh' }}>
      {/* Cố định Header ở trên cùng */}
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <Header />
      </div>
      
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg text-center p-4 p-md-5 rounded-4 animate__animated animate__zoomIn mt-4">
              <div className="mb-4">
                {/* Icon thành công */}
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
                      {/* Đảm bảo dùng đúng key totalAmount từ Backend Render */}
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
      
      <style>{`
        .text-espresso { color: #6F4E37; }
        .btn-espresso {
            background-color: #6F4E37;
            color: #fff;
            transition: all 0.3s ease;
        }
        .btn-espresso:hover { 
            background-color: #2C2420 !important; 
            color: #fff;
            transform: translateY(-2px);
        }
        .transition-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
          50% { opacity: 1; }
        }
        .animate__zoomIn {
          animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;