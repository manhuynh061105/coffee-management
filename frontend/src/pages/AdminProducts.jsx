import React, { useEffect, useState } from "react";

const AdminProducts = () => {
  const BACKEND_URL = "http://localhost:3000";

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  // Load danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.log("Lỗi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (!confirmDelete) return;

    try {
      await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      alert("Xoá thành công");
      fetchProducts();
    } catch (error) {
      console.log("Lỗi xoá sản phẩm:", error);
    }
  };

  // Mở form sửa
  const handleEditClick = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
    });
  };

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  // Update sản phẩm
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${BACKEND_URL}/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("Cập nhật thành công");

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.log("Lỗi cập nhật:", error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">
        Quản lý sản phẩm
      </h2>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark text-center">
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price?.toLocaleString()}₫</td>
                <td>{item.category}</td>

                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(item)}
                  >
                    Sửa
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM EDIT */}
      {editingProduct && (
        <div className="card shadow p-4 mt-5">
          <h4 className="mb-4">Chỉnh sửa sản phẩm</h4>

          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Giá</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Danh mục</label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary me-2">
              Cập nhật
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditingProduct(null)}
            >
              Huỷ
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;