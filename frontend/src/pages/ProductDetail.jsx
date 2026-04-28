import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../configs/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "../pages/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const IMAGE_BASE_URL = api.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        const data = res.data.data || res.data;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQtyChange = (num) => {
    if (quantity + num > 0) setQuantity(quantity + num);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#FCFBFA" }}
      >
        <div
          className="spinner-grow"
          role="status"
          style={{ color: "#6F4E37", backgroundColor: "#6F4E37" }}
        ></div>
        <p className="mt-3 fw-bold text-muted">
          Đang chuẩn bị hương vị Beans...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="container text-center my-5 p-5">
        <h3 className="fw-bold">Ối! Sản phẩm không tồn tại!</h3>
        <button
          className="btn btn-dark mt-3 rounded-pill px-4"
          onClick={() => navigate("/menu")}
        >
          Quay lại Menu
        </button>
      </div>
    );

  return (
    <div
      className="product-detail-page"
      style={{ backgroundColor: "#FCFBFA", minHeight: "100vh" }}
    >
      <div style={{ position: "relative", zIndex: 9999 }}>
        <Header />
      </div>

      <div className="container py-5 mt-5">
        <nav
          aria-label="breadcrumb"
          className="mb-5 pt-4 animate__animated animate__fadeIn"
        >
          <ol className="breadcrumb bg-white p-3 rounded-pill shadow-sm border px-4">
            <li className="breadcrumb-item">
              <button
                className="btn btn-link p-0 text-decoration-none text-muted small"
                onClick={() => navigate("/")}
              >
                Trang chủ
              </button>
            </li>
            <li className="breadcrumb-item">
              <button
                className="btn btn-link p-0 text-decoration-none text-muted small"
                onClick={() => navigate("/menu")}
              >
                Thực đơn
              </button>
            </li>
            <li
              className="breadcrumb-item active text-dark fw-bold small"
              aria-current="page"
            >
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6 animate__animated animate__fadeInLeft">
            <div className="product-img-holder p-3 bg-white shadow-soft rounded-5 border overflow-hidden">
              <img
                src={`${IMAGE_BASE_URL}/img/${product.image || "bac-xiu.jpg"}`}
                alt={product.name}
                className="img-fluid w-100 rounded-5 shadow-inner"
                style={{ maxHeight: "550px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/img/default-coffee.jpg";
                }}
              />
            </div>
          </div>

          <div className="col-lg-6 animate__animated animate__fadeInRight animate__delay-1s">
            <div className="product-info-card ps-lg-4">
              <div className="d-flex align-items-center mb-3">
                <span
                  className="text-uppercase small fw-bold letter-spacing-1 p-2 px-3 rounded-pill"
                  style={{
                    backgroundColor: "#2C2420",
                    color: "#FCFBFA",
                    fontSize: "0.75rem",
                  }}
                >
                  <i className="fa-solid fa-tag me-2 opacity-75"></i>
                  {product.category || "Cà phê"}
                </span>
                <span className="ms-3 text-muted small italic">
                  Beans Special Collection
                </span>
              </div>

              <h1
                className="fw-bold display-4 mb-3 text-dark"
                style={{ letterSpacing: "-1.5px" }}
              >
                {product.name}
              </h1>

              <div className="d-flex align-items-baseline mb-4">
                <h2
                  className="text-espresso fw-bold display-6 mb-0"
                  style={{ color: "#6F4E37" }}
                >
                  {product.price?.toLocaleString()}₫
                </h2>
                <span className="ms-3 text-muted">/ mỗi sản phẩm</span>
              </div>

              <div
                className="description-box mb-4 p-4 rounded-4"
                style={{
                  backgroundColor: "#FDFBFA",
                  borderLeft: "5px solid #A67B5B",
                }}
              >
                <h6
                  className="fw-bold text-uppercase small letter-spacing-1 mb-2"
                  style={{ color: "#A67B5B" }}
                >
                  Câu chuyện hương vị
                </h6>
                <p className="text-muted mb-0 leading-relaxed italic">
                  "
                  {product.description ||
                    "Hương vị nguyên bản được rang xay thủ công bởi các nghệ nhân Beans, mang đến trải nghiệm cà phê thuần khiết nhất từ cao nguyên Việt Nam."}
                  "
                </p>
              </div>

              <div className="quantity-selector d-flex align-items-center mb-5 mt-4">
                <span className="fw-bold me-4 text-uppercase small text-dark letter-spacing-1">
                  Số lượng:
                </span>
                <div className="d-flex align-items-center bg-white border rounded-pill shadow-sm p-1">
                  <button
                    className="btn d-flex align-items-center justify-content-center p-0 detail-qty-btn"
                    onClick={() => handleQtyChange(-1)}
                  >
                    <i className="fa-solid fa-minus text-white"></i>
                  </button>

                  <span
                    className="mx-4 fw-bold fs-5 text-dark"
                    style={{ minWidth: "30px", textAlign: "center" }}
                  >
                    {quantity}
                  </span>

                  <button
                    className="btn d-flex align-items-center justify-content-center p-0 detail-qty-btn"
                    onClick={() => handleQtyChange(1)}
                  >
                    <i className="fa-solid fa-plus text-white"></i>
                  </button>
                </div>
              </div>

              <div className="action-buttons mb-5">
                <button
                  className={`btn btn-lg w-100 py-3 rounded-pill fw-bold shadow-soft transition-all border-0 ${added ? "btn-success" : "btn-espresso"}`}
                  style={{
                    backgroundColor: added ? "#28a745" : "#6F4E37",
                    color: "#fff",
                  }}
                  onClick={handleAddToCart}
                >
                  <i
                    className={`fa-solid ${added ? "fa-check-circle" : "fa-cart-plus"} me-2`}
                  ></i>
                  {added ? "ĐÃ THÊM VÀO GIỎ!" : "THÊM VÀO GIỎ HÀNG"}
                </button>
              </div>

              <div className="row mt-5 pt-4 border-top g-3 bg-white rounded-4 shadow-sm p-3 border">
                {[
                  {
                    icon: "fa-truck-fast",
                    title: "Giao nhanh",
                    desc: "Trong 30 phút",
                  },
                  {
                    icon: "fa-leaf",
                    title: "Tự nhiên",
                    desc: "100% Nguyên mộc",
                  },
                  {
                    icon: "fa-shield-heart",
                    title: "Sạch 100%",
                    desc: "An toàn vệ sinh",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="col-4 text-center px-2">
                    <div
                      className="icon-circle mb-2"
                      style={{
                        backgroundColor: "#2C2420",
                        color: "#FCFBFA",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <i className={`fa-solid ${item.icon} fs-5`}></i>
                    </div>
                    <div className="small fw-bold text-dark">{item.title}</div>
                    <div className="text-muted extra-small d-none d-md-block">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
