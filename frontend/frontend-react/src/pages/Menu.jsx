import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [products, setProducts] = useState([]); // Danh sách gốc từ Server
  const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sau khi lọc
  const { addToCart } = useCart();
  const BACKEND_URL = 'http://localhost:3000';

  // Các State phục vụ bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  // 1. Fetch dữ liệu từ API
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const allProducts = data.data || data;
        setProducts(allProducts);
        setFilteredProducts(allProducts); // Mặc định mới vào thì hiện tất cả
      })
      .catch(err => console.log("Lỗi tải menu:", err));
  }, []);

  // 2. Logic Lọc và Tìm kiếm (Chạy mỗi khi các tiêu chí lọc thay đổi)
  useEffect(() => {
    let tempProducts = [...products];

    // Lọc theo tên
    if (searchTerm) {
      tempProducts = tempProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo loại (Category)
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    // Sắp xếp theo giá
    if (sortOrder === 'lowToHigh') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  // Lấy danh sách các Category duy nhất để hiển thị vào Select
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="menu-page">
      <Header />
      
      {/* Background Header nhỏ cho trang Menu */}
      <div className="bg-dark py-5 mb-5 mt-5">
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">THỰC ĐƠN CỦA CHÚNG TÔI</h1>
          <p className="lead">Hương vị đậm đà trong từng giọt cà phê</p>
        </div>
      </div>

      <div className="container mb-5">
        {/* THANH BỘ LỌC (FILTER BAR) */}
        <div className="row g-3 mb-4 p-3 bg-light rounded shadow-sm">
          {/* Tìm kiếm theo tên */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Tìm kiếm món:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập tên cà phê..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lọc theo loại */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Loại sản phẩm:</label>
            <select 
              className="form-select" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'Tất cả các loại' : cat}</option>
              ))}
            </select>
          </div>

          {/* Sắp xếp theo giá */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Sắp xếp giá:</label>
            <select 
              className="form-select" 
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
                <div className="card h-100 shadow-sm border-0 transition-hover">
                  <img 
                    src={`${BACKEND_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                    className="card-img-top" 
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h6 className="card-title text-uppercase fw-bold">{item.name}</h6>
                    <p className="text-muted small mb-1">{item.category}</p>
                    <p className="text-danger fw-bold mt-auto">{item.price?.toLocaleString()}₫</p>
                    <button 
                      onClick={() => addToCart(item)} 
                      className="btn btn-primary btn-sm w-100 mt-2"
                    >
                      <i className="fa-solid fa-cart-plus me-2"></i>Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5">
              <img src="/img/no-results.png" alt="No results" style={{ width: '100px', opacity: 0.5 }} />
              <p className="fs-4 text-muted mt-3">Rất tiếc, không tìm thấy món nào phù hợp!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;