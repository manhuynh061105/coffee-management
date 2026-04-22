import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Đảm bảo đúng đường dẫn
import Footer from "../components/Footer"; // Đảm bảo đúng đường dẫn

const AdminProducts = () => {
  const BACKEND_URL = "http://localhost:3000";

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Hàm tạo Headers chung (để tái sử dụng)
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // Gửi token lên Backend
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(), // Thêm Token vào đây
      });
      const result = await res.json();

      if (result.success) {
        alert("Xoá thành công!");
        fetchProducts();
      } else {
        alert("Lỗi: " + (result.message || "Bạn không có quyền thực hiện hành động này"));
      }
    } catch (error) {
      console.error("Lỗi xoá sản phẩm:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: getAuthHeaders(), // Thêm Token vào đây
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Cập nhật thành công!");
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" 
        ? Number(value) 
        : name === "category" 
          ? value.toLowerCase() // Tự động chuyển thành chữ thường ở đây
          : value,
    });
  };

  return (
    <div className="page-wrapper">
      {/* 1. THÊM HEADER */}
      <div className="bg-dark"><Header /></div>

      <div className="container py-5 mt-5" style={{ minHeight: '80vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary fw-bold">BẢNG ĐIỀU KHIỂN ADMIN</h2>
          <span className="text-muted">Quản lý kho hàng Beans Café</span>
        </div>

        {/* BẢNG DANH SÁCH */}
        <div className="table-responsive shadow-sm rounded-3">
          <table className="table table-hover align-middle bg-white mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-4">Sản phẩm</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td className="ps-4 fw-bold">{item.name}</td>
                  <td className="text-danger fw-bold">{item.price?.toLocaleString()}₫</td>
                  <td><span className="badge bg-light text-dark border">{item.category}</span></td>
                  <td className="text-center">
                    <button className="btn btn-outline-warning btn-sm me-2 px-3" onClick={() => handleEditClick(item)}>
                      Sửa
                    </button>
                    <button className="btn btn-outline-danger btn-sm px-3" onClick={() => handleDelete(item._id)}>
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- POP-UP MODAL EDIT --- */}
        {editingProduct && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-content fade-in-up" style={{ maxWidth: '500px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h4 className="fw-bold text-primary mb-0">Chỉnh sửa sản phẩm</h4>
                <button className="btn-close" onClick={() => setEditingProduct(null)}></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tên món</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Giá bán</label>
                  <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Danh mục</label>
                  <select name="category" className="form-select" value={formData.category} onChange={handleChange} required >
                    <option value="Coffee">Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Cake">Cake</option>
                    <option value="Smoothie">Smoothie</option>
                  </select>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary fw-bold">CẬP NHẬT NGAY</button>
                  <button type="button" className="btn btn-light" onClick={() => setEditingProduct(null)}>HỦY</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* 2. THÊM FOOTER */}
      <Footer />
    </div>
  );
};

export default AdminProducts;