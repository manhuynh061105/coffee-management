import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  let user = null;
  
  try {
    const userData = localStorage.getItem('user');
    user = userData ? JSON.parse(userData) : null;
  }
  catch (error) {
    console.error("Lỗi đọc dữ liệu người dùng:", error);
    user = null;
  }

  // - Kiểm tra xem người dùng đã đăng nhập chưa
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // - Kiểm tra vai trò của người dùng (Admin)
  if (user.role !== 'admin' && user.role !== 1) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AdminRoute;