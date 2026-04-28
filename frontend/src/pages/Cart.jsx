import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../pages/Cart.css";
import api from "../configs/api";

const Cart = () => {
  // Lấy thêm MAX_TOTAL_ITEMS từ context
  const { cart, updateQuantity, removeFromCart, totalAmount, MAX_TOTAL_ITEMS } =
    useCart();
  const navigate = useNavigate();

  const IMAGE_BASE_URL = api.defaults.baseURL.replace("/api", "");

  // Tính tổng số lượng hiện có trong giỏ
  const currentTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div
      className="page-wrapper"
      style={{ backgroundColor: "#F0F2F5", minHeight: "100vh" }}
    >
      <div style={{ position: "relative", zIndex: 9999 }}>
        <Header />
      </div>

      <div
        className="py-5 mt-5"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center text-white pt-4 py-3">
          <h2
            className="fw-bold text-uppercase mb-0"
            style={{ letterSpacing: "2px" }}
          >
            Giỏ hàng của bạn
          </h2>
          <div
            className="mx-auto mt-2"
            style={{ width: "50px", height: "3px", backgroundColor: "#D2691E" }}
          ></div>
        </div>
      </div>

      <div className="container my-5 pb-5">
        {cart.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-lg border">
            <div className="mb-4">
              <i
                className="fa-solid fa-cart-flatbed display-1 opacity-25"
                style={{ color: "#6F4E37" }}
              ></i>
            </div>
            <h3 className="fw-light text-muted">Giỏ hàng của bạn đang trống</h3>
            <Link
              to="/menu"
              className="btn btn-dark px-5 py-3 rounded-pill fw-bold mt-4 border-0 shadow"
              style={{ backgroundColor: "#6F4E37" }}
            >
              QUAY LẠI CHỌN MÓN
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-lg p-4 border">
                <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
                  <h5 className="fw-bold mb-0 text-dark">
                    Sản phẩm trong giỏ ({cart.length})
                  </h5>

                  {/* HIỂN THỊ GIỚI HẠN SỐ LƯỢNG */}
                  <div className="text-end" style={{ width: "200px" }}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="fw-bold text-muted">
                        Sức chứa đơn hàng:
                      </small>
                      <small
                        className={`fw-bold ${currentTotalItems >= MAX_TOTAL_ITEMS ? "text-danger" : "text-success"}`}
                      >
                        {currentTotalItems}/{MAX_TOTAL_ITEMS}
                      </small>
                    </div>
                    <div
                      className="progress"
                      style={{
                        height: "6px",
                        borderRadius: "10px",
                        backgroundColor: "#E9ECEF",
                      }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${(currentTotalItems / MAX_TOTAL_ITEMS) * 100}%`,
                          backgroundColor:
                            currentTotalItems >= MAX_TOTAL_ITEMS
                              ? "#dc3545"
                              : "#6F4E37",
                          transition: "width 0.5s ease",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="d-none d-md-flex fw-bold text-secondary border-bottom pb-3 mb-3 px-2 small text-uppercase">
                  <div style={{ width: "45%" }}>Sản phẩm</div>
                  <div style={{ width: "20%" }} className="text-center">
                    Đơn giá
                  </div>
                  <div style={{ width: "20%" }} className="text-center">
                    Số lượng
                  </div>
                  <div style={{ width: "15%" }} className="text-end">
                    Tổng tiền
                  </div>
                </div>

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="cart-item-row d-flex flex-wrap align-items-center p-3 mb-3 rounded-4 border bg-white shadow-sm"
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ width: "45%", minWidth: "250px" }}
                    >
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={`${IMAGE_BASE_URL}/img/${item.image || "bac-xiu.jpg"}`}
                          alt={item.name}
                          className="rounded-3 shadow-sm me-3 border"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.src = "/img/bac-xiu.jpg";
                          }}
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/product/${item._id}`}
                          className="text-decoration-none text-dark product-link-bold"
                        >
                          <h6 className="fw-bold mb-1">{item.name}</h6>
                        </Link>
                        <button
                          className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <small>
                            <i className="fa-solid fa-trash-can me-1"></i> Xóa
                          </small>
                        </button>
                      </div>
                    </div>

                    <div
                      style={{ width: "20%" }}
                      className="text-center d-none d-md-block fw-bold text-muted"
                    >
                      {item.price?.toLocaleString()}₫
                    </div>

                    <div style={{ width: "20%" }} className="text-center">
                      <div className="d-inline-flex align-items-center bg-light border rounded-pill p-1">
                        <button
                          className="btn d-flex align-items-center justify-content-center p-0 quantity-control-btn"
                          onClick={() => updateQuantity(item._id, -1)}
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "#6F4E37",
                            borderRadius: "50%",
                            border: "none",
                          }}
                        >
                          <i
                            className="fa-solid fa-minus text-white"
                            style={{ fontSize: "10px" }}
                          ></i>
                        </button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <button
                          className="btn d-flex align-items-center justify-content-center p-0 quantity-control-btn"
                          onClick={() => updateQuantity(item._id, 1)}
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor:
                              currentTotalItems >= MAX_TOTAL_ITEMS
                                ? "#A6A6A6"
                                : "#6F4E37",
                            borderRadius: "50%",
                            border: "none",
                            cursor:
                              currentTotalItems >= MAX_TOTAL_ITEMS
                                ? "not-allowed"
                                : "pointer",
                          }}
                          disabled={currentTotalItems >= MAX_TOTAL_ITEMS}
                        >
                          <i
                            className="fa-solid fa-plus text-white"
                            style={{ fontSize: "10px" }}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div
                      className="text-end fw-bold fs-5"
                      style={{ width: "15%", color: "#6F4E37" }}
                    >
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div
                className="bg-white p-4 rounded-4 shadow-lg border-2 border border-primary-subtle sticky-top"
                style={{ top: "100px", zIndex: 100 }}
              >
                <h4 className="fw-bold mb-4 text-dark border-bottom pb-3">
                  Chi tiết thanh toán
                </h4>

                <div className="d-flex justify-content-between mb-3 fs-6">
                  <span className="text-muted">Tổng lượng hàng:</span>
                  <span className="fw-bold">{currentTotalItems} sản phẩm</span>
                </div>

                <div className="d-flex justify-content-between mb-3 fs-6">
                  <span className="text-muted">Tổng tiền hàng:</span>
                  <span className="fw-bold">
                    {totalAmount.toLocaleString()}₫
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3 fs-6">
                  <span className="text-muted">Phí vận chuyển:</span>
                  <span className="text-success fw-bold">Miễn phí</span>
                </div>

                <div
                  className="my-4 p-3 rounded-3"
                  style={{
                    backgroundColor: "#FDF8F5",
                    border: "1px dashed #6F4E37",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Tổng thanh toán:</span>
                    <span className="fs-3 fw-bold" style={{ color: "#6F4E37" }}>
                      {totalAmount.toLocaleString()}₫
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-lg mb-3 border-0 transition-hover"
                  style={{ backgroundColor: "#6F4E37" }}
                >
                  ĐẶT HÀNG NGAY
                </button>

                <Link
                  to="/menu"
                  className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold border-2"
                >
                  <i className="fa-solid fa-arrow-left me-2 small"></i> TIẾP TỤC
                  CHỌN MÓN
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
