import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('coffee');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
        setName(''); setPrice(''); setImage(null); setPreview(null);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content fade-in-up shadow-lg border-0" style={{ maxWidth: '550px', borderRadius: '30px', overflow: 'hidden' }}>
        
        {/* Header Modal */}
        <div className="p-4 border-bottom bg-white d-flex justify-content-between align-items-center">
          <h4 className="fw-bold mb-0 text-espresso text-uppercase" style={{ letterSpacing: '1px' }}>
             Món mới cho Menu
          </h4>
          <button className="btn-close shadow-none" onClick={onClose}></button>
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
                />
                <span className="input-group-text bg-white custom-input border-start-0 fw-bold text-muted">₫</span>
              </div>
            </div>

            {/* Input Danh mục */}
            <div className="col-md-6 mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Danh mục</label>
              <select className="form-select custom-input" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                    <span>Tải ảnh lên hoặc kéo thả vào đây</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Footer Nút bấm */}
          <div className="d-flex gap-3 mt-4 pt-2">
            <button type="button" className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold" onClick={onClose}>
              HỦY BỎ
            </button>
            <button type="submit" className="btn btn-espresso w-100 py-3 rounded-pill fw-bold shadow">
              THÊM MÓN NGAY
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .text-espresso { color: #6F4E37; }
        .btn-espresso { background-color: #6F4E37; color: white; border: none; }
        .btn-espresso:hover { background-color: #2C2420; color: white; transform: translateY(-2px); transition: 0.3s; }
        
        .custom-input {
          border-radius: 12px;
          padding: 12px 15px;
          border: 1px solid #E0E0E0;
          font-size: 0.95rem;
        }
        .custom-input:focus {
          border-color: #6F4E37;
          box-shadow: 0 0 0 3px rgba(111, 78, 55, 0.1);
        }

        /* Upload Area */
        .upload-zone {
          border: 2px dashed #D7CCC8;
          border-radius: 20px;
          position: relative;
          height: 180px;
          transition: 0.3s;
          overflow: hidden;
          background: #FCFBFA;
        }
        .upload-zone:hover { border-color: #6F4E37; background: #FDF8F5; }
        .file-input { position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 2; }
        .file-label { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; margin: 0; }
        
        .upload-placeholder { text-align: center; color: #A1887F; }
        
        .preview-container { position: relative; width: 100%; height: 100%; }
        .preview-container img { width: 100%; height: 100%; object-fit: cover; }
        
        .change-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.4); color: white; display: flex; 
          align-items: center; justify-content: center; opacity: 0; transition: 0.3s;
        }
        .preview-container:hover .change-overlay { opacity: 1; }

        .fade-in-up { animation: fadeInUp 0.4s ease-out; }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        .custom-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(44, 36, 32, 0.7); display: flex; align-items: center;
          justify-content: center; z-index: 10001; backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default AddProduct;