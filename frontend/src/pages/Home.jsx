import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import api from "../configs/api";
import "../pages/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const footerRef = useRef(null);

  const IMAGE_BASE_URL = api.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        const allProducts = res.data.data || res.data;
        setProducts(allProducts);
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  const scrollToFooter = (e) => {
    e.preventDefault();
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: "#F8F9FA" }}>
      <Header />

      {/* --- HERO SECTION --- */}
      <section
        className="hero-section position-relative d-flex align-items-center"
        style={{
          height: "90vh",
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('/img/banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        <div className="container text-start animate__animated animate__fadeInLeft">
          <h1
            className="display-3 fw-bold text-white mb-3"
            style={{ letterSpacing: "-1px" }}
          >
            Đánh thức <span style={{ color: "#D2691E" }}>Cảm hứng</span>
            <br />
            Trong từng tách cà phê
          </h1>
          <p className="text-white-50 fs-5 mb-5" style={{ maxWidth: "600px" }}>
            Beans Café mang đến không gian tĩnh lặng và hương vị cà phê rang mộc
            nguyên chất, giúp bạn bắt đầu ngày mới tràn đầy năng lượng.
          </p>
          <div className="d-flex gap-3">
            <Link
              to="/menu"
              className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-lg border-0"
              style={{ backgroundColor: "#6F4E37" }}
            >
              KHÁM PHÁ MENU
            </Link>
            <a
              href="#footer"
              onClick={scrollToFooter}
              className="btn btn-outline-light px-5 py-3 rounded-pill fw-bold"
            >
              VỀ CHÚNG TÔI
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-4">
          <div className="row g-4 text-center">
            {[
              {
                icon: "fa-leaf",
                title: "Cà Phê Sạch",
                desc: "100% hạt Arabica & Robusta tuyển chọn",
              },
              {
                icon: "fa-truck-fast",
                title: "Giao Hàng Nhanh",
                desc: "Giao hàng nóng hổi chỉ trong 30 phút",
              },
              {
                icon: "fa-mug-hot",
                title: "Pha Chế Thủ Công",
                desc: "Hương vị đậm đà truyền thống",
              },
            ].map((feature, idx) => (
              <div key={idx} className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border hover-up">
                  <i
                    className={`fa-solid ${feature.icon} fs-1 mb-3`}
                    style={{ color: "#6F4E37" }}
                  ></i>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted small mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BEST SELLERS SECTION --- */}
      <section className="container my-5 py-5">
        <div className="text-center mb-5">
          <h6
            className="text-uppercase fw-bold"
            style={{ color: "#D2691E", letterSpacing: "2px" }}
          >
            Gợi ý cho bạn
          </h6>
          <h2 className="display-6 fw-bold" style={{ color: "#2C2420" }}>
            SẢN PHẨM BÁN CHẠY
          </h2>
          <div
            className="mx-auto mt-2"
            style={{ width: "60px", height: "4px", backgroundColor: "#6F4E37" }}
          ></div>
        </div>

        <div className="row g-4">
          {products.slice(0, 4).map((item) => (
            <div key={item._id} className="col-lg-3 col-md-6">
              <div className="card h-100 item-card-highlight border-0 shadow-lg">
                <div className="position-absolute top-0 start-0 m-3 z-3">
                  <span className="badge rounded-pill bg-danger px-3 py-2 shadow">
                    HOT
                  </span>
                </div>

                <div className="image-container p-3 overflow-hidden">
                  <img
                    src={`${IMAGE_BASE_URL}/img/${item.image || "bac-xiu.jpg"}`}
                    className="card-img-top shadow-sm"
                    alt={item.name}
                    style={{
                      height: "230px",
                      objectFit: "cover",
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                    }}
                    onError={(e) => {
                      e.target.src = "/img/default-coffee.jpg";
                    }}
                  />
                </div>

                <div className="card-body text-center pt-0 px-3 pb-4">
                  <h6
                    className="text-muted small text-uppercase mb-1 fw-bold"
                    style={{ color: "#8d8078" }}
                  >
                    {item.category || "Beans Special"}
                  </h6>
                  <h5
                    className="fw-bold mb-2 text-dark"
                    style={{ minHeight: "48px", fontSize: "1.1rem" }}
                  >
                    {item.name}
                  </h5>
                  <p className="fw-bold fs-4 mb-3" style={{ color: "#6F4E37" }}>
                    {item.price?.toLocaleString()}₫
                  </p>

                  <div className="d-grid gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="btn btn-cart-custom fw-bold rounded-pill py-2 shadow-sm"
                    >
                      <i className="fa-solid fa-cart-shopping me-2"></i>ĐẶT HÀNG
                      NGAY
                    </button>
                    <Link
                      to={`/product/${item._id}`}
                      className="btn btn-link-custom fw-bold rounded-pill py-2"
                    >
                      XEM CHI TIẾT
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link
            to="/menu"
            className="btn btn-dark px-5 py-3 rounded-pill fw-bold shadow-lg border-0 hover-scale"
            style={{ backgroundColor: "#2C2420" }}
          >
            XEM TẤT CẢ SẢN PHẨM{" "}
            <i className="fa-solid fa-chevron-right ms-2 small"></i>
          </Link>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section
        className="my-5 py-5 text-white text-center shadow-inner"
        style={{
          background: `linear-gradient(rgba(44, 36, 32, 0.9), rgba(44, 36, 32, 0.9)), url('/img/banner.jpg')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="container py-4">
          <h2 className="fw-bold display-5 mb-4">
            Bạn đã sẵn sàng thưởng thức?
          </h2>
          <p className="mb-4 fs-5 opacity-75">
            Tham gia cùng Beans Café để nhận ưu đãi 20% cho đơn hàng đầu tiên
          </p>
          <Link
            to="/register"
            className="btn btn-light px-5 py-3 rounded-pill fw-bold text-dark shadow-lg border-0 hover-scale"
          >
            ĐĂNG KÝ THÀNH VIÊN NGAY
          </Link>
        </div>
      </section>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
