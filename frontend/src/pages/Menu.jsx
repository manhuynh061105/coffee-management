import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Thêm Link để chuyển trang
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const { addToCart } = useCart();
  const BACKEND_URL = 'http://localhost:3000';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const allProducts = data.data || data;
        setProducts(allProducts);
        setFilteredProducts(allProducts); 
      })
      .catch(err => console.log("Lỗi tải menu:", err));
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
    <div className="menu-page">
      <Header />

      {/* Gộp phần đệm và phần tiêu đề vào một khối duy nhất */}
      <div className="bg-dark pt-5"> 
        {/* pt-5 ở đây sẽ thay thế cho cái div 40px cũ, tạo khoảng cách an toàn dưới Header */}
        <div className="py-5 mt-4"> {/* mt-4 giúp đẩy chữ xuống dưới Header một chút nữa */}
          <div className="container text-center text-white">
            <h1 className="display-4 fw-bold text-uppercase">Thực đơn của chúng tôi</h1>
            <p className="lead opacity-75">Hương vị đậm đà trong từng giọt cà phê</p>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {/* THANH BỘ LỌC */}
        <div className="row g-3 mb-5 p-4 bg-white rounded shadow-sm border">
          <div className="col-md-4">
            <label className="form-label fw-bold text-secondary">Tìm kiếm món:</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0" 
                placeholder="Nhập tên món ăn, đồ uống..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold text-secondary">Loại sản phẩm:</label>
            <select 
              className="form-select shadow-none" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'Tất cả các loại' : cat}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold text-secondary">Sắp xếp giá:</label>
            <select 
              className="form-select shadow-none" 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="lowToHigh">Giá từ thấp đến cao</option>
              <option value="highToLow">Giá từ cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(item => (
              <div key={item._id} className="col-md-3 col-6">
                <div className="card h-100 shadow-sm border-0 menu-item-card overflow-hidden">
                  
                  {/* Khu vực ảnh có Overlay chi tiết */}
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img 
                      src={`${BACKEND_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                      className="card-img-top w-100 h-100" 
                      alt={item.name}
                      style={{ objectFit: 'cover', transition: '0.4s' }}
                      onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
                    />
                    
                    {/* Overlay khi hover */}
                    <div className="menu-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                         style={{ backgroundColor: 'rgba(0,0,0,0.5)', opacity: 0, transition: '0.3s' }}>
                      <Link 
                        to={`/product/${item._id}`} 
                        className="btn btn-light btn-sm fw-bold rounded-pill px-3 shadow-lg"
                      >
                        <i className="fa-solid fa-eye me-1"></i> Xem chi tiết
                      </Link>
                    </div>
                  </div>

                  <div className="card-body text-center d-flex flex-column p-3">
                    <h6 className="card-title text-uppercase fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{item.name}</h6>
                    <p className="text-muted small mb-2" style={{ fontSize: '0.8rem' }}>{item.category}</p>
                    <p className="text-danger fw-bold fs-5 mt-auto mb-3">{item.price?.toLocaleString()}₫</p>
                    
                    <button 
                      onClick={() => addToCart(item)} 
                      className="btn btn-primary w-100 fw-bold rounded-pill shadow-sm"
                    >
                      <i className="fa-solid fa-cart-plus me-2"></i> ĐẶT HÀNG
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5 py-5">
              <i className="fa-solid fa-mug-hot fs-1 text-muted mb-3 opacity-25"></i>
              <p className="fs-4 text-muted mt-3 font-italic">Rất tiếc, Beans Café chưa có món này!</p>
              <button className="btn btn-link text-primary" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>Xem tất cả món</button>
            </div>
          )}
        </div>
      </div>

      {/* CSS cho hiệu ứng Hover đồng nhất */}
      <style>{`
        .menu-item-card {
          transition: all 0.3s ease;
        }
        .menu-item-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .menu-item-card:hover .menu-overlay {
          opacity: 1 !important;
        }
        .menu-item-card:hover img {
          transform: scale(1.1);
        }
        .transition-hover {
          transition: 0.3s;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Menu;