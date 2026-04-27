import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [orderInfo, setOrderInfo] = useState({
    phone: '',
    address: '',
    note: ''
  });

  // State quản lý hiển thị Modal và dữ liệu đơn hàng thành công
  const [showSuccess, setShowSuccess] = useState(false);
  const [finalOrderData, setFinalOrderData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy token từ localStorage
    const token = localStorage.getItem('token'); 

    // Kiểm tra nếu không có token thì bắt đăng nhập ngay
    if (!token) {
      alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      navigate('/login');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(orderInfo.phone)) {
        alert("Số điện thoại không hợp lệ!");
        return;
    }
    
    const orderData = {
      // userId có thể bỏ qua nếu Backend lấy id từ Token (tốt hơn cho bảo mật)
      phone: orderInfo.phone,
      address: orderInfo.address,
      note: orderInfo.note,
      items: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // THÊM DÒNG QUAN TRỌNG NÀY
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      
      if (result.success) {
        setFinalOrderData(result.data); 
        await clearCart();              
        setShowSuccess(true);           
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Không thể kết nối đến máy chủ!");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="bg-dark"><Header /></div>

      <div className="container mt-5 pt-5 mb-5" style={{ minHeight: '70vh' }}>
        <h2 className="text-primary fw-bold text-uppercase mb-4 text-center">Thanh toán</h2>
        
        <div className="row g-5">
          {/* FORM NHẬP THÔNG TIN (Giữ nguyên giao diện đẹp của em) */}
          <div className="col-md-7">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="mb-4 fw-bold border-bottom pb-2">Thông tin giao hàng</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Số điện thoại</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Nhập số điện thoại nhận hàng"
                    required 
                    onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Địa chỉ nhận hàng</label>
                  <textarea 
                    className="form-control form-control-lg" 
                    rows="3" 
                    placeholder="Số nhà, tên đường, phường/xã..."
                    required
                    onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Ghi chú (tùy chọn)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ví dụ: Ít đường, giao giờ hành chính..."
                    onChange={(e) => setOrderInfo({...orderInfo, note: e.target.value})} 
                  />
                </div>
                <button className="btn btn-primary btn-lg w-100 mt-4 fw-bold shadow-sm" type="submit">
                  XÁC NHẬN & ĐẶT HÀNG
                </button>
              </form>
            </div>
          </div>

          {/* TÓM TẮT ĐƠN HÀNG (Giữ nguyên giao diện đẹp của em) */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 bg-light p-4">
              <h4 className="card-title mb-4 fw-bold border-bottom pb-2">Đơn hàng của bạn</h4>
              <div className="cart-items-preview mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item._id} className="d-flex justify-content-between mb-3 align-items-center">
                    <div>
                      <span className="fw-bold">{item.name}</span>
                      <br />
                      <small className="text-muted">Số lượng: {item.quantity}</small>
                    </div>
                    <span className="fw-bold">{(item.price * item.quantity).toLocaleString()}₫</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 text-dark">
                <span>Tổng cộng:</span>
                <span className="text-danger">{totalAmount.toLocaleString()}₫</span>
              </div>
              <div className="mt-3">
                <small className="text-muted italic">* Miễn phí vận chuyển cho mọi đơn hàng tại Beans Café.</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- POP-UP MODAL ORDER SUCCESS --- */}
      {showSuccess && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content fade-in-up">
            <div className="text-center">
              <div className="mb-4">
                <i className="fa-solid fa-circle-check text-success bounce-in" style={{ fontSize: '5rem' }}></i>
              </div>
              <h2 className="fw-bold text-dark mb-2">Đặt hàng thành công!</h2>
              <p className="text-muted mb-4">Cảm ơn em đã ủng hộ Beans Café.</p>
              
              {finalOrderData && (
                <div className="bg-light p-3 rounded-3 text-start mb-4 border">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Mã đơn hàng:</span>
                    <span className="fw-bold">#{finalOrderData._id?.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Tổng thanh toán:</span>
                    <span className="fw-bold text-danger">{finalOrderData.total?.toLocaleString()}₫</span>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary btn-lg rounded-pill fw-bold"
                  onClick={() => navigate('/menu')}
                >
                  TIẾP TỤC MUA SẮM
                </button>
                <button 
                  className="btn btn-outline-secondary rounded-pill"
                  onClick={() => navigate('/')}
                >
                  VỀ TRANG CHỦ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      
    </div>
  );
};

export default Checkout;