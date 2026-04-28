import React, { useState } from 'react';
import { toast } from "react-toastify";

import api from '../configs/api';
import '../pages/AddProduct.css';

const AddProduct = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('coffee');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category.toLowerCase());
    formData.append('image', image);

    try {
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Thêm món mới thành công! Đang cập nhật Menu...');
        // Reset form
        setName(''); setPrice(''); setImage(null); setPreview(null);
        onClose();
        // Thay vì reload cả trang, bạn nên dùng logic callback để load lại danh sách món
        window.location.reload(); 
      }
    }
    catch (error) {
      console.error("Lỗi upload:", error);
      toast.error(error.response?.data?.message || 'Không thể thêm sản phẩm. Vui lòng thử lại!');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content fade-in-up shadow-lg border-0" style={{ maxWidth: '550px', borderRadius: '30px', overflow: 'hidden' }}>
        
        {/* Header Modal */}
        <div className="p-4 border-bottom bg-white d-flex justify-content-between align-items-center">
          <h4 className="fw-bold mb-0 text-espresso text-uppercase" style={{ letterSpacing: '1px' }}>
             ✨ Món mới cho Menu
          </h4>
          <button className="btn-close shadow-none" onClick={onClose} disabled={isSubmitting}></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-white">
          {/* Input Tên */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted text-uppercase">Tên sản phẩm</label>
            <input 
              type="text" 
              className="form-control custom-input" 
              placeholder="Ví dụ: Cà Phê Muối"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              disabled={isSubmitting}
            />
          </div>

          <div className="row">
            {/* Input Giá */}
            <div className="col-md-6 mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Giá (VNĐ)</label>
              <div className="input-group">
                <input 
                  type="number" 
                  className="form-control custom-input border-end-0" 
                  placeholder="0"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                  disabled={isSubmitting}
                />
                <span className="input-group-text bg-white custom-input border-start-0 fw-bold text-muted">₫</span>
              </div>
            </div>

            {/* Input Danh mục */}
            <div className="col-md-6 mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Danh mục</label>
              <select 
                className="form-select custom-input" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="coffee">☕ Cà phê</option>
                <option value="tea">🍑 Trà trái cây</option>
                <option value="cake">🍰 Bánh ngọt</option>
              </select>
            </div>
          </div>

          {/* Upload Ảnh */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted text-uppercase">Hình ảnh sản phẩm</label>
            <div className={`upload-zone ${preview ? 'has-image' : ''}`}>
              <input 
                type="file" 
                className="file-input" 
                accept="image/*" 
                onChange={handleImageChange} 
                id="productImage"
                required={!preview}
                disabled={isSubmitting}
              />
              <label htmlFor="productImage" className="file-label">
                {preview ? (
                  <div className="preview-container">
                    <img src={preview} alt="Preview" />
                    <div className="change-overlay">Thay đổi ảnh</div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <i className="fa-solid fa-cloud-arrow-up fs-2 mb-2"></i>
                    <span>Tải ảnh lên (Dưới 2MB)</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Footer Nút bấm */}
          <div className="d-flex gap-3 mt-4 pt-2">
            <button 
              type="button" 
              className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              HỦY BỎ
            </button>
            <button 
              type="submit" 
              className="btn btn-espresso w-100 py-3 rounded-pill fw-bold shadow d-flex align-items-center justify-content-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  ĐANG LƯU...
                </>
              ) : 'THÊM MÓN NGAY'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;