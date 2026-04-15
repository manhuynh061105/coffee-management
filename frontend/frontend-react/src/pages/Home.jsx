import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.data || data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="page wrapper">
      <div className="banner-group">
        <Header /> {/* Gọi Header ở đây */}
        <div className="banner-text text-start ps-5">
          <h1 className="title text-white">Hân hoan chào mừng quý khách đến với <span className="text-primary">Beans Café</span></h1>
          <p className="text-white mt-3 fs-5">Ở đây có cà phê ngon và những câu chuyện chưa kể</p>
          <button className="btn btn-primary px-5 py-2 rounded-pill mt-4 fw-bold">Mua ngay</button>
        </div>
      </div>

      {/* ... Phần Video giới thiệu giữ nguyên ... */}

      <section className="container my-5">
        <h3 className="text-center mb-4 text-primary">Sản phẩm bán chạy</h3>
        <div className="row g-4 py-4">
          {products.map(item => (
            <div key={item._id} className="col-md-3 col-6">
              <div className="content p-2 border rounded shadow-sm">
                <img src={`/img/${item.image || 'bac-xiu.jpg'}`} className="img-fluid rounded" alt={item.name} />
                <div className="text p-2 text-center">
                  <h5 className="text-uppercase">{item.name}</h5>
                  <p className="text-danger fw-bold">{item.price.toLocaleString()}₫</p>
                  <button onClick={() => addToCart(item)} className="btn btn-primary w-100">Đặt hàng</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer /> {/* Gọi Footer ở đây */}
    </div>
  );
};

export default Home;