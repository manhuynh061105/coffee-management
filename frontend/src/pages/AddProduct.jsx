import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('coffee');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Nếu không ở trạng thái mở thì không hiển thị gì cả
  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category.toLowerCase());
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        alert('Thêm sản phẩm thành công!');
        // Reset form
        setName(''); setPrice(''); setImage(null); setPreview(null);
        onClose(); // Đóng pop-up
        window.location.reload(); // Load lại trang để thấy món mới
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content fade-in-up" style={{ maxWidth: '600px', position: 'relative' }}>
        {/* Nút đóng X */}
        <button 
          className="btn-close" 
          style={{ position: 'absolute', top: '15px', right: '15px' }} 
          onClick={onClose}
        ></button>

        <h2 className="text-center mb-4 text-primary fw-bold">Thêm Sản Phẩm Mới</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Tên sản phẩm</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Giá (VNĐ)</label>
              <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Danh mục</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="coffee">Cà phê</option>
                <option value="tea">Trà trái cây</option>
                <option value="cake">Bánh ngọt</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Hình ảnh sản phẩm</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
            {preview && (
              <div className="mt-3 text-center bg-light p-2 rounded">
                <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '150px' }} />
              </div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
              LƯU SẢN PHẨM
            </button>
            <button type="button" className="btn btn-secondary w-50 fw-bold" onClick={onClose}>
              HỦY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;