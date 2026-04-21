import React, { useEffect, useState } from "react";
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

  // Fake data cho biểu đồ doanh thu
  const revenueData = [
    { month: "Jan", revenue: 1200000 },
    { month: "Feb", revenue: 1800000 },
    { month: "Mar", revenue: 1500000 },
    { month: "Apr", revenue: 2200000 },
    { month: "May", revenue: 1900000 },
  ];

  const fetchDashboardData = async () => {
    try {
      // lấy products
      const productRes = await fetch(`${BACKEND_URL}/api/products`);
      const productData = await productRes.json();

      // lấy order stats
      const statsRes = await fetch(`${BACKEND_URL}/api/orders/stats`);
      const statsData = await statsRes.json();

      setStats({
        totalProducts: productData.data?.length || 0,
        totalOrders: statsData.data?.totalOrders || 0,
        totalRevenue: statsData.data?.totalRevenue || 0,
      });
    } catch (error) {
      console.log("Lỗi dashboard:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary fw-bold mb-5">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow border-0 p-4 text-center">
            <h5>Tổng sản phẩm</h5>
            <h2 className="fw-bold text-primary">
              {stats.totalProducts}
            </h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 text-center">
            <h5>Tổng đơn hàng</h5>
            <h2 className="fw-bold text-success">
              {stats.totalOrders}
            </h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 p-4 text-center">
            <h5>Tổng doanh thu</h5>
            <h2 className="fw-bold text-danger">
              {stats.totalRevenue.toLocaleString()}₫
            </h2>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card shadow border-0 p-4">
        <h4 className="mb-4 fw-bold">
          Biểu đồ doanh thu theo tháng
        </h4>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;