import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../configs/api";
import "../pages/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Chỉ cập nhật nếu độ dài username <= 20
    if (e.target.id === "username" && e.target.value.length > 20) return;

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const toggleRole = () => {
    setFormData({
      ...formData,
      role: formData.role === "user" ? "admin" : "user",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài lần cuối
    if (formData.username.length > 20) {
      toast.error("Tên đăng nhập không được vượt quá 20 ký tự!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.success) {
        toast.success("Chào mừng bạn đến với Beans Café! Đăng ký thành công.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "Đăng ký thất bại! Vui lòng thử lại.",
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="logo-wrapper bounce-in mb-3">
              <img
                src="/img/logo.jpg"
                alt="Beans Café"
                className="rounded-circle shadow"
                width="80"
                height="80"
              />
            </div>
            <h2 className="fw-black text-espresso mb-1">GIA NHẬP BEANS</h2>
            <div
              className="mx-auto"
              style={{
                width: "40px",
                height: "3px",
                backgroundColor: "#6F4E37",
                borderRadius: "10px",
              }}
            ></div>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label-custom mb-0">Tên đăng nhập</label>
                <span
                  className={`small ${formData.username.length >= 18 ? "text-danger" : "text-muted"}`}
                  style={{ fontSize: "0.7rem" }}
                >
                  {formData.username.length}/20
                </span>
              </div>
              <div className="input-group-custom">
                <span className="input-icon">
                  <i className="fa-solid fa-user-plus"></i>
                </span>
                <input
                  type="text"
                  id="username"
                  className="form-control-custom"
                  placeholder="Ví dụ: nhuman123..."
                  value={formData.username}
                  onChange={handleChange}
                  maxLength={20} // Giới hạn trực tiếp trên HTML
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Mật khẩu</label>
              <div className="input-group-custom">
                <span className="input-icon">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control-custom"
                  placeholder="Ít nhất 6 ký tự"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label-custom">Xác nhận mật khẩu</label>
              <div className="input-group-custom">
                <span className="input-icon">
                  <i className="fa-solid fa-shield-check"></i>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control-custom"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4 text-center">
              <label className="form-label-custom mb-3">
                Bạn tham gia với vai trò?
              </label>
              <div
                className="role-switch-container shadow-sm mx-auto"
                onClick={toggleRole}
              >
                <div className={`role-slider ${formData.role}`}></div>
                <div
                  className={`role-label left ${formData.role === "user" ? "active" : ""}`}
                >
                  Khách hàng
                </div>
                <div
                  className={`role-label right ${formData.role === "admin" ? "active" : ""}`}
                >
                  Quản trị
                </div>
              </div>
            </div>

            <button type="submit" className="btn-auth-espresso shadow-lg">
              TẠO TÀI KHOẢN <i className="fa-solid fa-mug-hot ms-2"></i>
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="small text-muted">
              Đã là thành viên?{" "}
              <Link
                to="/login"
                className="fw-bold text-decoration-none color-accent-coffee"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
