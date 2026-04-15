import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  // Khai báo URL Backend để dễ quản lý
  const BACKEND_URL = 'http://localhost:3000';

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.data || data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="page wrapper">
      <div className="banner-group">
        <Header />
        <div className="banner-text text-start ps-5">
          <h1 className="title text-white">Hân hoan chào mừng quý khách đến với <span className="text-primary">Beans Café</span></h1>
          <p className="text-white mt-3 fs-5">Ở đây có cà phê ngon và những câu chuyện chưa kể</p>
          <button className="btn btn-primary px-5 py-2 rounded-pill mt-4 fw-bold">Mua ngay</button>
        </div>
      </div>

      <section className="container my-5">
        <h3 className="text-center mb-4 text-primary">Sản phẩm bán chạy</h3>
        <div className="row g-4 py-4">
          {products.map(item => (
            <div key={item._id} className="col-md-3 col-6">
              <div className="content p-2 border rounded shadow-sm">
                {/* SỬA DÒNG NÀY: Nối URL của Backend vào trước tên ảnh */}
                <img 
                  src={`${BACKEND_URL}/img/${item.image || 'bac-xiu.jpg'}`} 
                  className="img-fluid rounded" 
                  alt={item.name}
                  style={{ height: '200px', width: '100%', objectFit: 'cover' }} // Thêm để ảnh đều nhau
                  onError={(e) => { e.target.src = '/img/default-coffee.jpg' }} // Nếu ảnh lỗi thì hiện ảnh mặc định trong public của React
                />
                <div className="text p-2 text-center">
                  <h5 className="text-uppercase">{item.name}</h5>
                  {/* SỬA DÒNG NÀY: Thêm dấu ? để tránh lỗi khi price chưa kịp load */}
                  <p className="text-danger fw-bold">{item.price?.toLocaleString()}₫</p>
                  <button onClick={() => {
                      console.log("=== BẮT ĐẦU CLICK NÚT ===");
                      addToCart(item);
                    }} className="btn btn-primary w-100">Đặt hàng</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;