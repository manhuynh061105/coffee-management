import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../configs/api";
import "../pages/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  const IMAGE_BASE_URL = api.defaults.baseURL.replace("/api", "");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này khỏi thực đơn?"))
      return;
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data.success) {
        toast.success("Đã xoá sản phẩm thành công!");
        fetchProducts();
      } else {
        toast.error("Lỗi: " + (res.data.message || "Bạn không có quyền này"));
      }
    } catch (error) {
      console.error("Lỗi xoá sản phẩm:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xoá");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/products/${editingProduct._id}`, formData);
      if (res.data.success) {
        toast.success("Cập nhật thông tin thành công!");
        setEditingProduct(null);
        fetchProducts();
      } else {
        toast.error("Lỗi: " + res.data.message);
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error(
        error.response?.data?.message || "Không thể cập nhật sản phẩm",
      );
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
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/100x100?text=No+Image";

    if (imagePath.startsWith("/img")) {
      return `${IMAGE_BASE_URL}${imagePath}`;
    }
    return `${IMAGE_BASE_URL}/img/${imagePath.replace(/^\//, "")}`;
  };

  return (
    <div
      className="page-wrapper"
      style={{ backgroundColor: "#FCFBFA", minHeight: "100vh" }}
    >
      <Header />

      <div className="container py-5 mt-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 mt-4">
          <div>
            <h2
              className="fw-bold text-espresso mb-1 text-uppercase"
              style={{ letterSpacing: "1.5px" }}
            >
              Quản lý sản phẩm
            </h2>
            <div
              style={{
                width: "50px",
                height: "3px",
                backgroundColor: "#6F4E37",
                borderRadius: "10px",
              }}
            ></div>
          </div>
          <div className="mt-3 mt-md-0">
            <span className="badge bg-espresso text-white px-4 py-2 rounded-pill shadow-sm">
              Sản phẩm hiện có: {products.length}
            </span>
          </div>
        </div>

        {/* BẢNG DANH SÁCH */}
        <div className="card border-0 shadow-soft rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="border-bottom">
                <tr style={{ backgroundColor: "#FDF8F5" }}>
                  <th className="ps-4 py-4 text-uppercase small fw-bold text-espresso">
                    Sản phẩm
                  </th>
                  <th className="py-4 text-uppercase small fw-bold text-espresso">
                    Giá bán
                  </th>
                  <th className="py-4 text-uppercase small fw-bold text-espresso">
                    Danh mục
                  </th>
                  <th className="py-4 text-uppercase small fw-bold text-espresso text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-bottom-lighter">
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-4 overflow-hidden border me-3 shadow-sm bg-light"
                          style={{ width: "64px", height: "64px" }}
                        >
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/100x100?text=No+Image";
                            }}
                          />
                        </div>
                        <div>
                          <div className="fw-bold text-dark fs-6">
                            {item.name}
                          </div>
                          <small className="text-muted">
                            Mã: #{item._id.slice(-6).toUpperCase()}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="fw-bold text-espresso">
                        {item.price?.toLocaleString()}₫
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className="badge rounded-pill px-3 py-2 text-capitalize fw-normal"
                        style={{
                          backgroundColor: "#F3EFE9",
                          color: "#6F4E37",
                          border: "1px solid #E6DED5",
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-action-edit btn-sm rounded-pill px-3"
                          onClick={() => handleEditClick(item)}
                        >
                          <i className="fa-regular fa-pen-to-square me-1"></i>{" "}
                          Sửa
                        </button>
                        <button
                          className="btn btn-action-delete btn-sm rounded-pill px-3"
                          onClick={() => handleDelete(item._id)}
                        >
                          <i className="fa-regular fa-trash-can me-1"></i> Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* POP-UP MODAL */}
        {editingProduct && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-content fade-in-up shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h4
                  className="fw-bold text-espresso mb-0 text-uppercase"
                  style={{ letterSpacing: "1px" }}
                >
                  Chỉnh sửa món ăn
                </h4>
                <button
                  className="btn-close shadow-none"
                  onClick={() => setEditingProduct(null)}
                ></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control custom-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">
                      Giá bán (VNĐ)
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="form-control custom-input"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">
                      Danh mục
                    </label>
                    <select
                      name="category"
                      className="form-select custom-input text-capitalize"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="coffee">Cà phê</option>
                      <option value="tea">Trà</option>
                      <option value="cake">Bánh ngọt</option>
                      <option value="smoothie">Sinh tố</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    className="btn btn-espresso w-100 py-3 rounded-pill fw-bold shadow-sm"
                  >
                    LƯU THAY ĐỔI
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 rounded-pill fw-bold"
                    onClick={() => setEditingProduct(null)}
                  >
                    HỦY
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminProducts;
