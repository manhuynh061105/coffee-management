import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Hàm lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token'); // Lấy token
      
      // Nếu bạn đã sửa Backend dùng route /my-orders thì dùng URL đó sẽ tốt hơn
      // Ở đây tôi giữ URL cũ của bạn nhưng THÊM HEADERS
      const response = await fetch(`http://localhost:3000/api/orders/user/${user._id || user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Dòng này cực kỳ quan trọng
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (result.success) {
        setOrders(result.data);
      } else {
        console.error("Backend trả về lỗi:", result.message);
      }
    } catch (error) {
      console.error("Lỗi lấy lịch sử đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, []);

  // Hàm xác nhận đã nhận hàng
  const handleConfirmReceived = async (orderId) => {
    if (window.confirm("Bạn xác nhận đã nhận được đơn hàng này?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Phải có token mới sửa được trạng thái
          },
          body: JSON.stringify({ status: 'completed' }) 
        });
        
        const result = await response.json();
        if (result.success) {
          alert("Xác nhận thành công! Chúc bạn ngon miệng ☕");
          fetchOrders(); 
        } else {
          alert("Lỗi: " + result.message);
        }
      } catch (error) {
        alert("Không thể kết nối đến máy chủ!");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="bg-dark"><Header /></div>

      <div className="container mt-5 pt-5 mb-5" style={{ minHeight: '70vh' }}>
        <h2 className="text-primary fw-bold text-uppercase mb-4">Lịch sử đặt hàng</h2>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4">
            <p className="fs-5 text-muted">Em chưa có đơn hàng nào.</p>
            <button className="btn btn-primary rounded-pill px-4" onClick={() => navigate('/menu')}>Mua sắm ngay</button>
          </div>
        ) : (
          <div className="table-responsive shadow-sm rounded-4">
            <table className="table table-hover align-middle bg-white mb-0">
              <thead className="table-primary">
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="fw-bold">#{order._id.slice(-8).toUpperCase()}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="text-danger fw-bold">{order.total.toLocaleString()}₫</td>
                    <td>
                      <span className={`badge ${order.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {order.status === 'pending' ? 'Đang giao' : 'Đã nhận'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-outline-primary btn-sm rounded-pill px-3"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Chi tiết
                        </button>
                        
                        {/* Chỉ hiện nút Đã nhận hàng khi đơn hàng đang ở trạng thái pending */}
                        {order.status === 'pending' && (
                          <button 
                            className="btn btn-success btn-sm rounded-pill px-3"
                            onClick={() => handleConfirmReceived(order._id)}
                          >
                            Đã nhận hàng
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- MODAL CHI TIẾT ĐƠN HÀNG --- */}
      {selectedOrder && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content fade-in-up" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <h4 className="fw-bold mb-0 text-dark">Chi tiết đơn hàng #{selectedOrder._id.slice(-8).toUpperCase()}</h4>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}></button>
            </div>

            <div className="mb-4 bg-light p-3 rounded-3 border">
              <p className="mb-1 text-muted small text-uppercase fw-bold">Thông tin giao hàng:</p>
              <p className="mb-1"><strong>Số điện thoại:</strong> {selectedOrder.phone || 'N/A'}</p>
              <p className="mb-0"><strong>Địa chỉ:</strong> {selectedOrder.address || 'N/A'}</p>
              {selectedOrder.note && <p className="mb-0 mt-1 text-muted"><strong>Ghi chú:</strong> {selectedOrder.note}</p>}
            </div>

            <div className="order-items-list mb-4" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              <p className="text-muted small mb-2 text-uppercase fw-bold">Danh sách sản phẩm:</p>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between border-bottom py-2 align-items-center">
                  <span>
                    <strong className="text-dark">{item.productId?.name || 'Sản phẩm'}</strong>
                    <br/>
                    <small className="text-muted">Số lượng: {item.quantity}</small>
                  </span>
                  <span className="fw-bold text-dark">{(item.productId?.price * item.quantity).toLocaleString()}₫</span>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between fs-5 fw-bold text-danger border-top pt-3">
              <span>Tổng cộng:</span>
              <span>{selectedOrder.total.toLocaleString()}₫</span>
            </div>

            <div className="mt-4 text-center">
              <button className="btn btn-secondary rounded-pill px-5" onClick={() => setSelectedOrder(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderHistory;