import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import api from "../configs/api";
import "../pages/Menu.css";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const IMAGE_BASE_URL = api.defaults.baseURL.replace("/api", "");

  // Hàm xử lý đặt hàng kèm kiểm tra login
  const handleAddToCart = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("☕ Vui lòng đăng nhập để đặt món nhé!", {
        theme: "colored"
      });
      return;
    }
    addToCart(item);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
  };

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        const allProducts = res.data.data || res.data;
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      })
      .catch((err) => console.error("Lỗi tải menu:", err));
  }, []);

  useEffect(() => {
    let tempProducts = [...products];
    if (searchTerm) {
      tempProducts = tempProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(
        (p) => p.category === selectedCategory,
      );
    }
    if (sortOrder === "lowToHigh") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="menu-page" style={{ backgroundColor: "#F8F9FA" }}>
      <Header />

      {/* --- PREMIUM BANNER --- */}
      <div
        className="position-relative d-flex align-items-center justify-content-center text-center"
        style={{
          height: "350px",
          background: `linear-gradient(rgba(44, 36, 32, 0.7), rgba(44, 36, 32, 0.7)), url('/img/banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        <div className="container animate__animated animate__fadeIn">
          <h1 className="display-4 fw-bold text-white text-uppercase mb-2">Thực đơn</h1>
          <div className="mx-auto mb-3" style={{ width: "60px", height: "4px", backgroundColor: "#D2691E" }}></div>
          <p className="fs-5 text-white-50 italic">Hương vị cà phê mộc thượng hạng</p>
        </div>
      </div>

      <div className="container mt-n5 position-relative" style={{ zIndex: 5 }}>
        
        {/* --- THANH BỘ LỌC CẢI TIẾN --- */}
        <div className="filter-wrapper p-2 bg-white rounded-5 shadow-lg mb-5 mx-1 border border-2">
          <div className="row g-2 align-items-end p-3">
            <div className="col-md-5">
              <div className="search-box-custom px-3 py-2 input-custom-bg rounded-pill d-flex align-items-center border">
                <i className="fa-solid fa-magnifying-glass text-muted me-2"></i>
                <input
                  type="text"
                  className="form-control border-0 bg-transparent shadow-none"
                  placeholder="Tìm món bạn thích..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3 col-6">
              <select
                className="form-select border input-custom-bg rounded-pill py-2 shadow-none px-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "Tất cả danh mục" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 col-6">
              <select
                className="form-select border input-custom-bg rounded-pill py-2 shadow-none px-3"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="lowToHigh">Giá: Thấp đến Cao</option>
                <option value="highToLow">Giá: Cao đến Thấp</option>
              </select>
            </div>
            
            <div className="col-md-1 d-none d-md-block text-center">
              <button 
                  onClick={() => {setSearchTerm(""); setSelectedCategory("All"); setSortOrder("default")}} 
                  className="btn btn-espresso-outline rounded-circle shadow-sm p-2"
                  style={{ width: '42px', height: '42px' }}
              >
                  <i className="fa-solid fa-rotate-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* --- DANH SÁCH SẢN PHẨM --- */}
        <div className="row g-4 mb-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className="col-lg-3 col-md-6 col-12">
                <div className="card h-100 border-0 shadow-sm item-card-highlight overflow-hidden">
                  <div className="position-relative overflow-hidden p-3" style={{ height: "240px" }}>
                    <img
                      src={`${IMAGE_BASE_URL}/img/${item.image || "bac-xiu.jpg"}`}
                      className="card-img-top w-100 h-100 shadow-sm"
                      alt={item.name}
                      style={{ objectFit: "cover", borderRadius: "20px" }}
                      onError={(e) => { e.target.src = "/img/bac-xiu.jpg"; }}
                    />
                    <div className="item-badge position-absolute top-0 start-0 m-4">
                      <span className="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill small fw-bold">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="card-body text-center d-flex flex-column px-4 pb-4 pt-0">
                    <h5 className="fw-bold mb-2 text-dark" style={{ minHeight: "50px" }}>
                      {item.name}
                    </h5>
                    <p className="fw-bold fs-4 mb-3" style={{ color: "#6F4E37" }}>
                      {item.price?.toLocaleString()}₫
                    </p>

                    <div className="d-grid gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-espresso-main fw-bold rounded-pill py-2 shadow-sm border-0"
                      >
                        <i className="fa-solid fa-cart-shopping me-2"></i>ĐẶT HÀNG
                      </button>
                      <Link
                        to={`/product/${item._id}`}
                        className="btn btn-espresso-outline fw-bold rounded-pill py-2"
                      >
                        XEM CHI TIẾT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5 py-5 animate__animated animate__fadeIn">
              <i className="fa-solid fa-mug-hot display-1 text-muted opacity-25 mb-3"></i>
              <h3 className="text-muted fw-light">Rất tiếc, Beans Café chưa có món này!</h3>
              <button className="btn btn-link text-decoration-none mt-2" style={{ color: "#6F4E37" }} onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}>
                Quay lại thực đơn
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;