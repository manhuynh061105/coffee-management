import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const AdminDashboard = () => {
  const BACKEND_URL = "http://localhost:3000";

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  // State lưu dữ liệu biểu đồ thật
  const [revenueData, setRevenueData] = useState([]);

 const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");
    
    // Kiểm tra token trước khi gọi
    if (!token) {
      console.error("Token không tồn tại. Vui lòng đăng nhập lại.");
      return;
    }

    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    // 1. Lấy danh sách sản phẩm (Route này thường không cần bảo mật)
    const productRes = await fetch(`${BACKEND_URL}/api/products`);
    const productData = await productRes.json();

    // 2. Lấy thống kê (Route này CẦN Token)
    const statsRes = await fetch(`${BACKEND_URL}/api/orders/stats`, { headers });
    
    // Kiểm tra nếu response không ổn (ví dụ 401, 403, 500)
    if (!statsRes.ok) {
      const errorText = await statsRes.text();
      console.error(`Lỗi API Stats (${statsRes.status}):`, errorText);
      return; 
    }

    const statsData = await statsRes.json();
    console.log("Dữ liệu Stats nhận được:", statsData); // Dòng này để em check log ở Console

    if (statsData.success && statsData.data) {
      // Cập nhật các con số
      setStats({
        totalProducts: productData.data?.length || 0,
        totalOrders: statsData.data.totalOrders || 0,
        totalRevenue: statsData.data.totalRevenue || 0,
      });

      // Cập nhật biểu đồ
      if (statsData.data.monthlyRevenue && statsData.data.monthlyRevenue.length > 0) {
        setRevenueData(statsData.data.monthlyRevenue);
      } else {
        // Nếu Backend chưa có mảng monthlyRevenue, tạo mảng ảo dựa trên doanh thu tổng
        const currentMonth = new Date().toLocaleString('default', { month: 'short' });
        setRevenueData([{ month: currentMonth, revenue: statsData.data.totalRevenue || 0 }]);
      }
    } else {
      console.warn("API trả về success: false hoặc data rỗng", statsData);
    }
  } catch (error) {
    console.error("Lỗi kết nối Dashboard:", error);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="page-wrapper bg-light" style={{ minHeight: "100vh" }}>
      {/* THÊM HEADER */}
      <Header />

      <div className="container py-5 mt-5">
        <h1 className="text-center text-primary fw-bold mb-5">
          HỆ THỐNG QUẢN TRỊ (DASHBOARD)
        </h1>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow border-0 p-4 text-center h-100">
              <i className="fa-solid fa-mug-hot text-primary mb-3 fs-1"></i>
              <h5 className="text-muted">Tổng sản phẩm</h5>
              <h2 className="fw-bold text-primary">
                {stats.totalProducts}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4 text-center h-100">
              <i className="fa-solid fa-cart-shopping text-success mb-3 fs-1"></i>
              <h5 className="text-muted">Đơn hàng thành công</h5>
              <h2 className="fw-bold text-success">
                {stats.totalOrders}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4 text-center h-100">
              <i className="fa-solid fa-money-bill-trend-up text-danger mb-3 fs-1"></i>
              <h5 className="text-muted">Doanh thu thật</h5>
              <h2 className="fw-bold text-danger">
                {stats.totalRevenue.toLocaleString()}₫
              </h2>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card shadow border-0 p-4 mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold m-0">Biểu đồ doanh thu thực tế</h4>
            <span className="badge bg-primary px-3 py-2 rounded-pill">Dữ liệu thời gian thực</span>
          </div>

          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toLocaleString()}k`} />
                <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()}₫`, "Doanh thu"]}
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#0d6efd" radius={[5, 5, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* THÊM FOOTER */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;