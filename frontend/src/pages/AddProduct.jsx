import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('coffee'); // Mặc định là coffee
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Để xem trước ảnh
  const navigate = useNavigate();

  // Xử lý khi chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Tạo link tạm để hiển thị ảnh lên màn hình
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Dùng FormData để gửi cả file và text
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Gửi token để verifyToken & isAdmin xử lý
        }
      });

      if (response.data.success) {
        alert('Thêm sản phẩm thành công!');
        navigate('/'); // Xong thì về trang chủ xem thành quả
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container my-5" style={{ maxWidth: '600px' }}>
        <div className="card shadow p-4">
          <h2 className="text-center mb-4 text-primary">Thêm Sản Phẩm Mới</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Tên sản phẩm</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Giá (VNĐ)</label>
              <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Danh mục</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="coffee">Cà phê</option>
                <option value="tea">Trà trái cây</option>
                <option value="cake">Bánh ngọt</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Hình ảnh sản phẩm</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
              {preview && (
                <div className="mt-3 text-center">
                  <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-3">
              LƯU SẢN PHẨM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;