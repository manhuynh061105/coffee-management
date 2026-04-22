import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate

const Cart = () => {
  // Lấy thêm totalAmount từ Context để code gọn hơn
  const { cart, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate(); // Khởi tạo điều hướng
  
  const BACKEND_URL = 'http://localhost:3000';

  // Hàm xử lý khi nhấn thanh toán
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }
    navigate('/checkout'); // Chuyển hướng sang trang thanh toán
  };

  return (
    <div className="page-wrapper">
      <div className="bg-dark"><Header /></div>

      <div style={{ height: '50px' }}></div>
      
      <div className="container pt-5 my-5" style={{ minHeight: '60vh' }}>
        <h2 className="text-primary mb-4 fw-bold text-uppercase">Giỏ hàng của bạn</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="fa-solid fa-cart-shopping fs-1 text-muted mb-3"></i>
            <p className="fs-5">Giỏ hàng của bạn đang trống.</p>
            <Link to="/menu" className="btn btn-primary px-4 rounded-pill">Tiếp tục mua sắm</Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th className="text-center">Số lượng</th>
                      <th>Tổng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item._id}>
                        <td>
                          <Link 
                            to={`/product/${item._id}`} 
                            className="d-flex align-items-center text-decoration-none text-dark cart-item-link"
                          >
                            <img 
                              src={`${BACKEND_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                              alt={item.name} 
                              width="60" 
                              height="60"
                              className="me-3 rounded shadow-sm" 
                              style={{ objectFit: 'cover' }}
                              onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
                            />
                            <span className="fw-bold product-name-link">{item.name}</span>
                          </Link>
                        </td>
                        <td>{item.price?.toLocaleString()}₫</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, -1)}>-</button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, 1)}>+</button>
                          </div>
                        </td>
                        <td className="fw-bold text-primary">{(item.price * item.quantity).toLocaleString()}₫</td>
                        <td>
                          <button className="btn btn-sm text-danger" onClick={() => removeFromCart(item._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card p-4 shadow-sm border-0 bg-light">
                <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>
                <div className="d-flex justify-content-between mb-3 fs-5">
                  <span>Tạm tính:</span>
                  <span className="fw-bold text-danger">{totalAmount.toLocaleString()}₫</span>
                </div>
                <hr />
                <div className="mb-3">
                  <small className="text-muted">* Phí vận chuyển sẽ được tính khi thanh toán.</small>
                </div>
                {/* CẬP NHẬT: Nút thanh toán gọi hàm handleCheckout */}
                <button 
                  onClick={handleCheckout}
                  className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow"
                >
                  TIẾN HÀNH THANH TOÁN
                </button>
                <Link to="/menu" className="btn btn-link w-100 mt-2 text-decoration-none text-muted">
                  <i className="fa-solid fa-arrow-left me-2"></i>Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cart-item-link:hover .product-name-link {
          color: #0d6efd; 
          text-decoration: underline;
        }
        .cart-item-link img {
          transition: transform 0.2s;
        }
        .cart-item-link:hover img {
          transform: scale(1.05);
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Cart;