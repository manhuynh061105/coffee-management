import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import api from '../configs/api'; // 1. Import cấu hình api chung

const Menu = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  // 2. Lấy URL gốc cho hình ảnh
  const IMAGE_BASE_URL = api.defaults.baseURL.replace('/api', '');

  useEffect(() => {
    // 3. Sử dụng api.get thay cho fetch
    api.get('/products')
      .then(res => {
        const allProducts = res.data.data || res.data;
        setProducts(allProducts);
        setFilteredProducts(allProducts); 
      })
      .catch(err => console.error("Lỗi tải menu:", err));
  }, []);

  useEffect(() => {
    let tempProducts = [...products];
    if (searchTerm) {
      tempProducts = tempProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }
    if (sortOrder === 'lowToHigh') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="menu-page" style={{ backgroundColor: '#F8F9FA' }}>
      <Header />

      {/* --- PREMIUM BANNER --- */}
      <div className="position-relative d-flex align-items-center justify-content-center text-center" 
           style={{ 
             height: '400px', 
             background: `linear-gradient(rgba(44, 36, 32, 0.7), rgba(44, 36, 32, 0.7)), url('/img/banner.jpg')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             marginTop: '60px'
           }}>
        <div className="container animate__animated animate__fadeIn">
          <h1 className="display-3 fw-bold text-white text-uppercase mb-2" style={{ letterSpacing: '3px' }}>Thực đơn</h1>
          <div className="mx-auto mb-3" style={{ width: '80px', height: '4px', backgroundColor: '#D2691E' }}></div>
          <p className="fs-5 text-white-50 italic">Khám phá hương vị cà phê mộc thượng hạng tại Beans Café</p>
        </div>
      </div>

      <div className="container mt-n5 position-relative" style={{ zIndex: 5 }}>
        {/* --- THANH BỘ LỌC (FILTER BAR) --- */}
        <div className="row g-3 mb-5 p-4 bg-white rounded-4 shadow-lg border-0 mx-1">
          <div className="col-md-4">
            <label className="form-label fw-bold text-dark small text-uppercase mb-2">Tìm kiếm món</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
              <input 
                type="text" 
                className="form-control bg-light border-0 shadow-none py-2" 
                placeholder="Bạn muốn uống gì hôm nay?..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold text-dark small text-uppercase mb-2">Danh mục</label>
            <select 
              className="form-select bg-light border-0 shadow-none py-2" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'Tất cả sản phẩm' : cat}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold text-dark small text-uppercase mb-2">Sắp xếp theo giá</label>
            <select 
              className="form-select bg-light border-0 shadow-none py-2" 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="lowToHigh">Giá tăng dần</option>
              <option value="highToLow">Giá giảm dần</option>
            </select>
          </div>
        </div>

        {/* --- DANH SÁCH SẢN PHẨM --- */}
        <div className="row g-4 mb-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(item => (
              <div key={item._id} className="col-lg-3 col-md-6 col-12">
                <div className="card h-100 border-0 shadow-sm menu-item-card-premium overflow-hidden" style={{ borderRadius: '25px' }}>
                  
                  <div className="position-relative overflow-hidden p-3" style={{ height: '240px' }}>
                    <img 
                      /* 4. Cập nhật đường dẫn ảnh linh hoạt */
                      src={`${IMAGE_BASE_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                      className="card-img-top w-100 h-100 shadow-sm" 
                      alt={item.name}
                      style={{ objectFit: 'cover', transition: '0.5s', borderRadius: '20px' }}
                      onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
                    />
                    <div className="item-badge position-absolute top-0 start-0 m-4">
                        <span className="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill small fw-bold">
                            {item.category}
                        </span>
                    </div>
                  </div>

                  <div className="card-body text-center d-flex flex-column px-4 pb-4 pt-0">
                    <h5 className="fw-bold mb-2 text-dark" style={{ minHeight: '50px' }}>{item.name}</h5>
                    <p className="fw-bold fs-4 mb-3" style={{ color: '#6F4E37' }}>{item.price?.toLocaleString()}₫</p>
                    
                    <div className="d-grid gap-2">
                        <button 
                          onClick={() => addToCart(item)} 
                          className="btn btn-coffee fw-bold rounded-pill py-2 shadow-sm"
                        >
                          <i className="fa-solid fa-cart-shopping me-2"></i>ĐẶT HÀNG
                        </button>
                        <Link 
                          to={`/product/${item._id}`} 
                          className="btn btn-outline-coffee fw-bold rounded-pill py-2"
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
              <div className="mb-3"><i className="fa-solid fa-mug-hot display-1 text-muted opacity-25"></i></div>
              <h3 className="text-muted fw-light">Rất tiếc, Beans Café chưa có món này!</h3>
              <button className="btn btn-link text-decoration-none" style={{ color: '#6F4E37' }} onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>Quay lại thực đơn</button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .mt-n5 { margin-top: -80px !important; }
        
        .menu-item-card-premium {
          transition: all 0.4s ease;
          background: #fff;
        }

        .menu-item-card-premium:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(111, 78, 55, 0.15) !important;
        }

        .menu-item-card-premium:hover img {
          transform: scale(1.08);
        }

        .btn-coffee {
          background-color: #6F4E37;
          color: white;
          border: none;
          transition: 0.3s;
        }

        .btn-coffee:hover {
          background-color: #2C2420;
          color: white;
          transform: translateY(-2px);
        }

        .btn-outline-coffee {
          border: 2px solid #6F4E37;
          color: #6F4E37;
          font-size: 0.85rem;
          transition: 0.3s;
        }

        .btn-outline-coffee:hover {
          background-color: #6F4E37;
          color: white;
        }

        .form-select, .form-control {
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default Menu;