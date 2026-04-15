import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page-wrapper">
      <div className="bg-dark"><Header /></div>
      
      <div className="container pt-5 my-5" style={{ minHeight: '60vh' }}>
        <h2 className="text-primary mb-4">Giỏ hàng của bạn</h2>
        
        {cart.length === 0 ? (
          <div className="text-center">
            <p>Giỏ hàng trống. <Link to="/">Tiếp tục mua sắm</Link></p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={`/img/${item.image}`} alt={item.name} width="50" className="me-3 rounded" />
                            <span className="fw-bold">{item.name}</span>
                          </div>
                        </td>
                        <td>{item.price.toLocaleString()}₫</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, -1)}>-</button>
                            <span className="mx-3">{item.quantity}</span>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, 1)}>+</button>
                          </div>
                        </td>
                        <td>{(item.price * item.quantity).toLocaleString()}₫</td>
                        <td>
                          <button className="btn btn-sm text-danger" onClick={() => removeFromCart(item._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card p-4 shadow-sm">
                <h4>Tổng cộng</h4>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span>Tạm tính:</span>
                  <span className="fw-bold">{totalAmount.toLocaleString()}₫</span>
                </div>
                <button className="btn btn-primary w-100 py-2 rounded-pill fw-bold">THANH TOÁN</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;