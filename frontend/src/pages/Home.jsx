import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        const allProducts = data.data || data;
        setProducts(allProducts);
      })
      .catch(err => console.log("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <div className="page wrapper">
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

      <section className="container my-5">
        <h3 className="text-center mb-4 text-primary fw-bold text-uppercase">Sản phẩm bán chạy</h3>
        
        <div className="row g-4 py-4">
          {products.slice(0, 4).map(item => (
            <div key={item._id} className="col-md-3 col-6">
              <div className="content p-2 border rounded shadow-sm h-100 d-flex flex-column justify-content-between item-card">
                
                {/* Khu vực ảnh có hiệu ứng Hover */}
                <div className="image-wrapper position-relative overflow-hidden rounded">
                  <img 
                    src={`${BACKEND_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                    className="img-fluid" 
                    alt={item.name}
                    style={{ height: '220px', width: '100%', objectFit: 'cover', transition: '0.3s' }}
                    onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
                  />
                  
                  {/* Lớp phủ (Overlay) hiện lên khi hover */}
                  <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, transition: '0.3s' }}>
                    <Link 
                      to={`/product/${item._id}`} 
                      className="btn btn-light btn-sm fw-bold rounded-pill px-3 shadow"
                    >
                      <i className="fa-solid fa-magnifying-glass me-1"></i> Xem chi tiết
                    </Link>
                  </div>
                </div>

                <div className="text p-2 text-center">
                  <h5 className="text-uppercase fs-6 fw-bold mb-1 mt-2">{item.name}</h5>
                  <p className="text-danger fw-bold mb-3">{item.price?.toLocaleString()}₫</p>
                  
                  <button 
                    onClick={() => addToCart(item)} 
                    className="btn btn-primary w-100 fw-bold rounded-pill shadow-sm"
                  >
                    <i className="fa-solid fa-cart-plus me-2"></i> ĐẶT HÀNG
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5">
          <Link to="/menu" className="btn btn-outline-primary px-5 py-2 rounded-pill fw-bold shadow-sm">
            Xem tất cả sản phẩm <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      {/* CSS bổ trợ để hiệu ứng hover hoạt động mượt mà */}
      <style>{`
        .item-card:hover .overlay {
          opacity: 1 !important;
        }
        .item-card:hover img {
          transform: scale(1.1);
        }
        .item-card {
          transition: transform 0.2s;
        }
        .item-card:hover {
          transform: translateY(-5px);
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Home;