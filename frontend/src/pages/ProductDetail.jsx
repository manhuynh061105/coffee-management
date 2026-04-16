import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = 'http://localhost:3000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Gọi API lấy chi tiết 1 sản phẩm theo ID
        const res = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        const data = res.data.data || res.data;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào trang mới
  }, [id]);

  // Hàm xử lý tăng giảm số lượng tại chỗ
  const handleQtyChange = (num) => {
    if (quantity + num > 0) setQuantity(quantity + num);
  };

  if (loading) return (
    <div className="text-center my-5 p-5">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-2">Đang pha cà phê cho bạn...</p>
    </div>
  );

  if (!product) return (
    <div className="container text-center my-5 p-5">
      <h3>Sản phẩm không tồn tại!</h3>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/menu')}>Quay lại Menu</button>
    </div>
  );

  return (
    <div className="product-detail-wrapper">
      <div className="bg-dark"><Header /></div>

      <div style={{ height: '40px' }}></div>

      <div className="container my-5 pt-5">
        {/* Nút quay lại */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><button className="btn btn-link p-0 text-decoration-none" onClick={() => navigate('/')}>Trang chủ</button></li>
            <li className="breadcrumb-item"><button className="btn btn-link p-0 text-decoration-none" onClick={() => navigate('/menu')}>Menu</button></li>
            <li className="breadcrumb-item active">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Cột Trái: Hình ảnh */}
          <div className="col-md-6">
            <div className="product-image-container shadow-sm rounded overflow-hidden border">
              <img 
                src={`${BACKEND_URL}/img/${product.image || 'bac-xiu.jpg'}`} 
                alt={product.name} 
                className="img-fluid w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/img/default-coffee.jpg' }}
              />
            </div>
          </div>

          {/* Cột Phải: Thông tin */}
          <div className="col-md-6">
            <div className="ps-md-4">
              <span className="badge bg-primary px-3 py-2 mb-2 text-uppercase">{product.category}</span>
              <h1 className="fw-bold display-5 mb-2">{product.name}</h1>
              <h2 className="text-danger fw-bold mb-4">{(product.price * quantity).toLocaleString()}₫</h2>
              
              <hr />
              
              <div className="product-description mb-4">
                <h5 className="fw-bold"><i className="fa-solid fa-file-lines me-2 text-primary"></i>Mô tả sản phẩm:</h5>
                <p className="text-muted fs-5 leading-relaxed">
                  {product.description || "Thưởng thức hương vị tinh tế, đậm đà được Beans Café tuyển chọn kỹ lưỡng từ những vùng nguyên liệu tốt nhất. Một trải nghiệm khó quên cho những tín đồ yêu thích sự nguyên bản."}
                </p>
              </div>

              {/* Bộ chọn số lượng */}
              <div className="d-flex align-items-center mb-4">
                <span className="fw-bold me-3">Số lượng:</span>
                <div className="input-group" style={{ width: '130px' }}>
                  <button className="btn btn-outline-secondary" onClick={() => handleQtyChange(-1)}>-</button>
                  <span className="form-control text-center fw-bold">{quantity}</span>
                  <button className="btn btn-outline-secondary" onClick={() => handleQtyChange(1)}>+</button>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="d-grid gap-2 d-md-flex mt-4">
                <button 
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm"
                  onClick={() => {
                    // Thêm vào giỏ hàng với số lượng hiện tại
                    for(let i=0; i<quantity; i++) addToCart(product);
                    // Có thể thêm thông báo alert hoặc toast ở đây
                  }}
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i> THÊM VÀO GIỎ HÀNG
                </button>
              </div>

              {/* Cam kết nhỏ */}
              <div className="mt-5 border-top pt-4">
                <div className="row text-center text-muted small g-2">
                  <div className="col-4 border-end"><i className="fa-solid fa-truck-fast d-block fs-4 mb-2"></i> Giao hàng nhanh</div>
                  <div className="col-4 border-end"><i className="fa-solid fa-leaf d-block fs-4 mb-2"></i> Nguyên liệu sạch</div>
                  <div className="col-4"><i className="fa-solid fa-shield-halved d-block fs-4 mb-2"></i> An toàn vệ sinh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style>{`
        .breadcrumb-item button { color: #6c757d; font-size: 0.9rem; }
        .breadcrumb-item.active { font-size: 0.9rem; font-weight: bold; }
        .product-image-container img { transition: transform 0.5s ease; }
        .product-image-container:hover img { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default ProductDetail;