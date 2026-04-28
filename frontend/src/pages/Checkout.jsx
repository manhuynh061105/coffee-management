import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../configs/api";
import "../pages/Checkout.css";

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [orderInfo, setOrderInfo] = useState({
    customerName: user?.username || user?.name || "",
    phone: "",
    address: "",
    note: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [finalOrderData, setFinalOrderData] = useState(null);
  const [displayAmount, setDisplayAmount] = useState(0);

  const IMAGE_BASE_URL = api.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cart.length === 0 && !showSuccess) {
      navigate("/menu");
    }
  }, [cart, navigate, showSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(orderInfo.phone)) {
      toast.error("Số điện thoại không hợp lệ (phải có 10 chữ số)!");
      return;
    }

    const currentTotal = totalAmount;

    const orderData = {
      customerName: orderInfo.customerName,
      phone: orderInfo.phone,
      address: orderInfo.address,
      note: orderInfo.note,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount: currentTotal,
    };

    try {
      const response = await api.post("/orders", orderData);

      if (response.data.success) {
        setFinalOrderData(response.data.data);
        setDisplayAmount(currentTotal);
        setShowSuccess(true);
        await clearCart();
      } else {
        toast.error("Lỗi: " + response.data.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(
        error.response?.data?.message || "Không thể kết nối đến máy chủ!",
      );
    }
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: "#FCFBFA" }}>
      <div style={{ position: "relative", zIndex: 9999 }}>
        <Header />
      </div>

      <div className="container mt-5 pt-5 mb-5" style={{ minHeight: "80vh" }}>
        <div className="text-center mb-5 pt-3">
          <h2
            className="fw-bold text-uppercase"
            style={{ color: "#2C2420", letterSpacing: "2px" }}
          >
            Thanh toán đơn hàng
          </h2>
          <div
            className="mx-auto"
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "#6F4E37",
              borderRadius: "10px",
            }}
          ></div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card shadow-soft border-0 rounded-4 p-4 animate__animated animate__fadeInLeft">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="icon-circle-sm me-3"
                  style={{ backgroundColor: "#6F4E37", color: "#fff" }}
                >
                  1
                </div>
                <h4 className="mb-0 fw-bold">Thông tin giao hàng</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      className="form-control border-2 py-3"
                      placeholder="Tên người nhận"
                      value={orderInfo.customerName}
                      required
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase">
                      Số điện thoại *
                    </label>
                    <input
                      type="text"
                      className="form-control border-2 py-3"
                      placeholder="Số điện thoại nhận hàng"
                      required
                      onChange={(e) =>
                        setOrderInfo({ ...orderInfo, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase">
                    Địa chỉ nhận hàng *
                  </label>
                  <textarea
                    className="form-control border-2"
                    rows="3"
                    placeholder="Ví dụ: 123 Đường ABC, Quận X, TP. Đà Nẵng"
                    required
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, address: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase">
                    Ghi chú cho Beans Café
                  </label>
                  <input
                    type="text"
                    className="form-control border-2 py-3"
                    placeholder="Ít đường, giao trước 5h chiều..."
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, note: e.target.value })
                    }
                  />
                </div>

                <div
                  className="p-3 rounded-4 mb-4"
                  style={{
                    backgroundColor: "#FDF8F5",
                    border: "1px solid #6F4E37",
                  }}
                >
                  <p className="small mb-0 text-muted">
                    <i className="fa-solid fa-circle-info me-2 text-espresso"></i>
                    Vui lòng kiểm tra kỹ thông tin trước khi đặt hàng. Beans
                    Café sẽ gọi điện xác nhận trong vòng 5 phút.
                  </p>
                </div>

                <button
                  className="btn btn-espresso btn-lg w-100 py-3 rounded-pill fw-bold shadow transition-all border-0"
                  style={{ backgroundColor: "#6F4E37", color: "#fff" }}
                  type="submit"
                >
                  XÁC NHẬN & ĐẶT HÀNG NGAY
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div
              className="card shadow-soft border-0 rounded-4 p-4 animate__animated animate__fadeInRight"
              style={{ backgroundColor: "#2C2420", color: "#FCFBFA" }}
            >
              <h4 className="card-title mb-4 fw-bold border-bottom border-secondary pb-3">
                Đơn hàng của bạn
              </h4>
              <div
                className="cart-items-preview mb-3 custom-scrollbar"
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between mb-3 align-items-center border-bottom border-dark pb-3"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-white rounded-3 p-1 me-3">
                        <img
                          src={`${IMAGE_BASE_URL}/img/${item.image}`}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                          className="rounded-2"
                          onError={(e) => {
                            e.target.src = "/img/default-coffee.jpg";
                          }}
                        />
                      </div>
                      <div>
                        <span className="fw-bold d-block">{item.name}</span>
                        <small className="opacity-75">
                          SL: {item.quantity}
                        </small>
                      </div>
                    </div>
                    <span className="fw-bold">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-between mb-2 opacity-75">
                  <span>Tạm tính:</span>
                  <span>{totalAmount.toLocaleString()}₫</span>
                </div>
                <div className="d-flex justify-content-between mb-3 opacity-75">
                  <span>Phí vận chuyển:</span>
                  <span className="text-success fw-bold">Miễn phí</span>
                </div>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between fw-bold fs-4 mt-3">
                  <span>Tổng tiền:</span>
                  <span style={{ color: "#D2691E" }}>
                    {totalAmount.toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="custom-modal-overlay">
          <div
            className="custom-modal-content fade-in-up text-center shadow-lg"
            style={{ maxWidth: "450px" }}
          >
            <div className="mb-4">
              <div className="success-checkmark mx-auto">
                <i
                  className="fa-solid fa-mug-hot bounce-in"
                  style={{ fontSize: "3rem", color: "#6F4E37" }}
                ></i>
              </div>
            </div>
            <h2 className="fw-bold text-dark mb-2">Tuyệt vời!</h2>
            <p className="text-muted mb-4 px-3">
              Đơn hàng của em đã được Beans Café tiếp nhận và đang bắt đầu pha
              chế.
            </p>

            {finalOrderData && (
              <div className="bg-light p-3 rounded-4 text-start mb-4 border border-dashed">
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Mã đơn hàng:</span>
                  <span className="fw-bold text-espresso">
                    #{finalOrderData._id?.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Người nhận:</span>
                  <span className="fw-bold">{finalOrderData.customerName}</span>
                </div>
                <div className="d-flex justify-content-between border-top pt-2 mt-2">
                  <span className="fw-bold">Đã thanh toán:</span>
                  <span className="fw-bold text-espresso fs-5">
                    {displayAmount.toLocaleString()}₫
                  </span>
                </div>
              </div>
            )}

            <div className="d-grid gap-2">
              <button
                className="btn btn-espresso btn-lg rounded-pill fw-bold py-3"
                style={{ backgroundColor: "#6F4E37", color: "#fff" }}
                onClick={() => navigate("/menu")}
              >
                TIẾP TỤC TRẢI NGHIỆM
              </button>
              <button
                className="btn btn-link text-decoration-none text-muted fw-bold"
                onClick={() => navigate("/")}
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
