import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// 1. Sử dụng api instance để tự động đính kèm Token
import api from '../configs/api'; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // 2. Gọi đồng thời cả 2 API để tối ưu tốc độ load
      const [productRes, statsRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders/stats')
      ]);

      const productData = productRes.data;
      const statsData = statsRes.data;

      if (statsData.success && statsData.data) {
        setStats({
          totalProducts: productData.data?.length || 0,
          totalOrders: statsData.data.totalOrders || 0,
          totalRevenue: statsData.data.totalRevenue || 0,
        });

        // Xử lý dữ liệu biểu đồ
        if (statsData.data.monthlyRevenue && statsData.data.monthlyRevenue.length > 0) {
          setRevenueData(statsData.data.monthlyRevenue);
        } else {
          // Fallback nếu chưa có dữ liệu tháng
          const currentMonth = new Date().toLocaleString('default', { month: 'short' });
          setRevenueData([{ month: currentMonth, revenue: statsData.data.totalRevenue || 0 }]);
        }
      }
    } catch (error) {
      console.error("Lỗi kết nối Dashboard:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = ["#4B3621", "#6F4E37", "#8B5E3C", "#A67B5B"];

  return (
    <div className="page-wrapper" style={{ backgroundColor: '#F4F1EE', minHeight: "100vh" }}>
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <Header />
      </div>

      <div className="container py-5 mt-5">
        <div className="text-center mb-5 mt-4">
          <h2 className="fw-bold text-espresso text-uppercase" style={{ letterSpacing: '3px' }}>
            Thống kê doanh thu
          </h2>
          <div className="mx-auto mt-2" style={{ width: '80px', height: '4px', backgroundColor: '#6F4E37', borderRadius: '10px' }}></div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card stat-card-premium border-0 p-4 h-100 shadow-lg-soft">
              <div className="d-flex align-items-center">
                <div className="icon-circle bg-espresso-gradient shadow-sm me-3">
                  <i className="fa-solid fa-box-archive text-white"></i>
                </div>
                <div>
                  <p className="text-muted-dark small fw-bold text-uppercase mb-0">Sản phẩm</p>
                  <h2 className="fw-black text-espresso mb-0">
                    {loading ? '...' : stats.totalProducts}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card stat-card-premium border-0 p-4 h-100 shadow-lg-soft">
              <div className="d-flex align-items-center">
                <div className="icon-circle bg-caramel-gradient shadow-sm me-3">
                  <i className="fa-solid fa-file-invoice-dollar text-white"></i>
                </div>
                <div>
                  <p className="text-muted-dark small fw-bold text-uppercase mb-0">Đơn hàng</p>
                  <h2 className="fw-black text-espresso mb-0">
                    {loading ? '...' : stats.totalOrders}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card stat-card-premium border-0 p-4 h-100 shadow-lg-soft">
              <div className="d-flex align-items-center">
                <div className="icon-circle bg-gold-gradient shadow-sm me-3">
                  <i className="fa-solid fa-chart-line text-white"></i>
                </div>
                <div>
                  <p className="text-muted-dark small fw-bold text-uppercase mb-0">Doanh thu</p>
                  <h2 className="fw-black text-espresso mb-0">
                    {loading ? '...' : stats.totalRevenue.toLocaleString()}₫
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ Doanh Thu */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 shadow-lg-soft p-5 rounded-5 bg-white border-top-espresso">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h4 className="fw-bold text-espresso mb-1">
                    <i className="fa-solid fa-chart-simple me-2"></i>Thống kê doanh thu thực tế
                  </h4>
                  <p className="text-muted small">Phân tích biến động tài chính dựa trên các đơn hoàn thành</p>
                </div>
                <button 
                  className="btn btn-dark rounded-pill px-4 btn-sm shadow-none"
                  onClick={() => window.print()}
                >
                  Xuất báo cáo
                </button>
              </div>

              <div style={{ width: '100%', height: 400 }}>
                {loading ? (
                   <div className="h-100 d-flex justify-content-center align-items-center">
                      <div className="spinner-border text-espresso"></div>
                   </div>
                ) : (
                  <ResponsiveContainer>
                    <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#EFEFEF" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#555', fontSize: 13, fontWeight: '500' }}
                        dy={15}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#555', fontSize: 13 }}
                        tickFormatter={(value) => `${(value / 1000).toLocaleString()}k`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#F9F7F5' }}
                        contentStyle={{ 
                          borderRadius: '20px', 
                          border: 'none', 
                          boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                          padding: '20px'
                        }}
                        formatter={(value) => [`${value.toLocaleString()}₫`, "Doanh thu"]}
                      />
                      <Bar dataKey="revenue" radius={[12, 12, 0, 0]} barSize={55}>
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        .text-espresso { color: #3E2723; }
        .fw-black { font-weight: 900; }
        .text-muted-dark { color: #7D6B5D; }
        
        /* Đổ bóng mạnh hơn để card nổi lên */
        .shadow-lg-soft { 
          box-shadow: 0 20px 40px rgba(62, 39, 35, 0.08) !important; 
        }

        .stat-card-premium {
          background: white;
          border-radius: 28px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .stat-card-premium:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(62, 39, 35, 0.12) !important;
        }

        /* Gradient cho Icon giúp nổi bật hơn màu phẳng */
        .icon-circle {
          width: 65px;
          height: 65px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
        }
        .bg-espresso-gradient { background: linear-gradient(135deg, #4B3621, #6F4E37); }
        .bg-caramel-gradient { background: linear-gradient(135deg, #A67B5B, #D4A373); }
        .bg-gold-gradient { background: linear-gradient(135deg, #D4A373, #FED8B1); }

        .rounded-5 { border-radius: 40px !important; }
        
        /* Nhấn mạnh viền trên của Card biểu đồ */
        .border-top-espresso {
          border-top: 5px solid #6F4E37 !important;
        }

        .page-wrapper {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;