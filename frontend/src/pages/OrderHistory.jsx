import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../configs/api";
import "../pages/OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const userId = user._id || user.id;

      const response = await api.get(`/orders/user/${userId}`);

      if (response.data.success) {
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error(
        "Lỗi lấy lịch sử đơn hàng:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, []);

  const handleConfirmReceived = async (orderId) => {
    if (window.confirm("Bạn xác nhận đã nhận được đơn hàng này?")) {
      try {
        const response = await api.put(`/orders/${orderId}`, {
          status: "completed",
        });

        if (response.data.success) {
          setOrders((prevOrders) =>
            prevOrders.map((ord) =>
              ord._id === orderId ? { ...ord, status: "completed" } : ord,
            ),
          );
          toast.success("Tuyệt vời! Chúc bạn thưởng thức cà phê ngon miệng.");
        }
      } catch (error) {
        console.error("Lỗi xác nhận đơn hàng:", error);
        toast.error(
          error.response?.data?.message || "Không thể kết nối đến máy chủ!",
        );
      }
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{ backgroundColor: "#FCFBFA", minHeight: "100vh" }}
    >
      <div style={{ position: "relative", zIndex: 9999 }}>
        <Header />
      </div>

      {/* --- HERO SECTION --- */}
      <div
        className="pt-5 mt-5 pb-4"
        style={{
          background: "linear-gradient(rgba(44, 36, 32, 0.03), transparent)",
        }}
      >
        <div className="container mt-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted small">
                  Trang chủ
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-espresso fw-bold small"
                aria-current="page"
              >
                Lịch sử đơn hàng
              </li>
            </ol>
          </nav>
          <h2
            className="fw-bold text-uppercase m-0"
            style={{ color: "#2C2420", letterSpacing: "1.5px" }}
          >
            Đơn hàng của bạn
          </h2>
          <p className="text-muted small">
            Quản lý và theo dõi quá trình giao nhận cà phê
          </p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row">
          {/* --- SIDEBAR --- */}
          <div className="col-lg-3 mb-4">
            <div className="card border-0 shadow-soft rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center mb-3 p-2">
                <div
                  className="rounded-circle bg-espresso text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                  style={{ width: "45px", height: "45px" }}
                >
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="ms-3" style={{ maxWidth: "175px" }}>
                  <p className="mb-0 text-muted small">Xin chào,</p>
                  <p className="mb-0 fw-bold text-espresso text-truncate">
                    {user?.username || "Khách hàng"}
                  </p>
                </div>
              </div>
              <hr className="opacity-10" />
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action border-0 py-2 rounded-3 active-espresso">
                  <i className="fa-solid fa-clock-rotate-left me-2"></i> Lịch sử
                  mua hàng
                </button>
                <button
                  onClick={() => navigate("/menu")}
                  className="list-group-item list-group-item-action border-0 py-2 rounded-3 mt-1"
                >
                  <i className="fa-solid fa-mug-hot me-2"></i> Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="col-lg-9">
            {loading ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-soft border">
                <div className="spinner-border text-espresso"></div>
                <p className="mt-3 text-muted">
                  Đang tìm lại những kỉ niệm hương vị...
                </p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-5 bg-white shadow-soft rounded-4 border">
                <div className="mb-4">
                  <i
                    className="fa-solid fa-receipt text-light-espresso"
                    style={{ fontSize: "5rem", opacity: 0.3 }}
                  ></i>
                </div>
                <h4 className="fw-bold text-espresso">Chưa có đơn hàng nào</h4>
                <p className="text-muted mb-4">
                  Có vẻ như bạn chưa thưởng thức cà phê của Beans Café rồi!
                </p>
                <button
                  className="btn btn-espresso rounded-pill px-5 py-2 fw-bold"
                  onClick={() => navigate("/menu")}
                >
                  ĐẶT MÓN NGAY
                </button>
              </div>
            ) : (
              <div className="card border-0 shadow-soft rounded-4 bg-white overflow-hidden">
                <div className="card-header bg-white py-3 border-bottom-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-espresso">
                      Danh sách đơn hàng
                    </h5>
                    <span className="badge bg-espresso-subtle text-espresso rounded-pill px-3">
                      {orders.length} đơn hàng
                    </span>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ backgroundColor: "#FDF8F5" }}>
                      <tr>
                        <th className="ps-4 py-3 text-uppercase small fw-bold">
                          Mã đơn
                        </th>
                        <th className="py-3 text-uppercase small fw-bold">
                          Ngày đặt
                        </th>
                        <th className="py-3 text-uppercase small fw-bold">
                          Tổng tiền
                        </th>
                        <th className="py-3 text-uppercase small fw-bold text-center">
                          Trạng thái
                        </th>
                        <th className="py-3 text-center text-uppercase small fw-bold pe-4">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="ps-4">
                            <span className="fw-bold text-espresso">
                              #{order._id.slice(-8).toUpperCase()}
                            </span>
                          </td>
                          <td className="text-muted">
                            {new Date(order.createdAt).toLocaleDateString(
                              "vi-VN",
                            )}
                          </td>
                          <td className="fw-bold text-dark">
                            {(
                              order.totalAmount ||
                              order.total ||
                              0
                            ).toLocaleString()}
                            ₫
                          </td>
                          <td className="text-center">
                            <span
                              className={`badge rounded-pill px-3 py-2 ${
                                order.status === "completed"
                                  ? "bg-success-subtle text-success border border-success"
                                  : "bg-warning-subtle text-dark border border-warning"
                              }`}
                            >
                              {order.status === "pending"
                                ? "🚀 Đang giao"
                                : "✅ Hoàn thành"}
                            </span>
                          </td>
                          <td className="text-center pe-4">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-bold"
                                onClick={() => setSelectedOrder(order)}
                              >
                                Chi tiết
                              </button>
                              {order.status === "pending" && (
                                <button
                                  className="btn btn-espresso btn-sm rounded-pill px-3 fw-bold shadow-sm"
                                  onClick={() =>
                                    handleConfirmReceived(order._id)
                                  }
                                >
                                  Đã nhận
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL CHI TIẾT --- */}
      {selectedOrder && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content fade-in-up shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <div>
                <h4 className="fw-bold mb-0">Chi tiết đơn hàng</h4>
                <small className="text-muted">
                  Mã: #{selectedOrder._id.toUpperCase()}
                </small>
              </div>
              <button
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
              ></button>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="bg-light p-3 rounded-4 h-100 border-0">
                  <p className="text-muted small text-uppercase fw-bold mb-2">
                    Thông tin người nhận
                  </p>
                  <div className="fw-bold text-dark">
                    {selectedOrder.customerName}
                  </div>
                  <div className="small text-muted">{selectedOrder.phone}</div>
                  <div className="small text-muted">
                    {selectedOrder.address}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bg-light p-3 rounded-4 h-100 border-0">
                  <p className="text-muted small text-uppercase fw-bold mb-2">
                    Ghi chú
                  </p>
                  <p className="small fst-italic text-espresso mb-0">
                    {selectedOrder.note
                      ? `"${selectedOrder.note}"`
                      : "Không có ghi chú nào từ bạn."}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="order-items mb-4 custom-scrollbar pe-2"
              style={{ maxHeight: "250px", overflowY: "auto" }}
            >
              <p className="text-muted small text-uppercase fw-bold mb-2">
                Sản phẩm đã đặt
              </p>
              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center py-2 border-bottom border-light"
                >
                  <div>
                    <div className="fw-bold text-dark">
                      {item.productId?.name || "Sản phẩm không còn tồn tại"}
                    </div>
                    <small className="text-muted">
                      Số lượng: {item.quantity}
                    </small>
                  </div>
                  <div className="fw-bold text-espresso">
                    {(
                      (item.productId?.price || 0) * item.quantity
                    ).toLocaleString()}
                    ₫
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center border-top pt-3 bg-white">
              <span className="fw-bold fs-5 text-dark">Thanh toán:</span>
              <span className="fw-bold fs-4 text-espresso">
                {(
                  selectedOrder.totalAmount ||
                  selectedOrder.total ||
                  0
                ).toLocaleString()}
                ₫
              </span>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-espresso w-100 py-3 rounded-pill fw-bold border-0 shadow"
                onClick={() => setSelectedOrder(null)}
              >
                ĐÓNG CHI TIẾT
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderHistory;
