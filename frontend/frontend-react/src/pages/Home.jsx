import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link để chuyển trang không load lại
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const BACKEND_URL = 'http://localhost:3000';

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        // Lấy toàn bộ danh sách từ API (đề phòng trường hợp API trả về data.data hoặc data)
        const allProducts = data.data || data;
        setProducts(allProducts);
      })
      .catch(err => console.log("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <div className="page wrapper">
      {/* Banner Group - Giữ nguyên layout đẹp của em */}
      <div className="banner-group">
        <Header />
        <div className="banner-text text-start ps-5">
          <h1 className="title text-white">
            Hân hoan chào mừng quý khách đến với <span className="text-primary">Beans Café</span>
          </h1>
          <p className="text-white mt-3 fs-5">Ở đây có cà phê ngon và những câu chuyện chưa kể</p>
          <Link to="/menu" className="btn btn-primary px-5 py-2 rounded-pill mt-4 fw-bold text-decoration-none">
            Mua ngay
          </Link>
        </div>
      </div>

      {/* Phần Video giới thiệu (Nếu em có code video ở giữa thì chèn vào đây nhé) */}

      {/* Section Sản phẩm */}
      <section className="container my-5">
        <h3 className="text-center mb-4 text-primary fw-bold text-uppercase">Sản phẩm bán chạy</h3>
        
        <div className="row g-4 py-4">
          {/* Chỉ lấy 4 sản phẩm đầu tiên để hiển thị ở trang chủ */}
          {products.slice(0, 4).map(item => (
            <div key={item._id} className="col-md-3 col-6">
              <div className="content p-2 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
                <div className="image-wrapper">
                  <img 
                    src={`${BACKEND_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                    className="img-fluid rounded" 
                    alt={item.name}
                    style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
                  />
                </div>
                <div className="text p-2 text-center">
                  <h5 className="text-uppercase fs-6 fw-bold">{item.name}</h5>
                  <p className="text-danger fw-bold">{item.price?.toLocaleString()}₫</p>
                  <button 
                    onClick={() => addToCart(item)} 
                    className="btn btn-primary w-100 mt-auto"
                  >
                    <i className="fa-solid fa-cart-plus me-2"></i>Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Nút Xem tất cả dẫn đến trang Menu */}
        <div className="text-center mt-5">
          <Link 
            to="/menu" 
            className="btn btn-outline-primary px-5 py-2 rounded-pill fw-bold shadow-sm transition-all"
          >
            Xem tất cả sản phẩm <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;