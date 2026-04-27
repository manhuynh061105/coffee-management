import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  let user = null;
  
  try {
    const userData = localStorage.getItem('user');
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Lỗi đọc dữ liệu người dùng:", error);
    user = null;
  }

  // 1. Kiểm tra nếu chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. Kiểm tra quyền Admin 
  // Lưu ý: Nếu backend trả về số 1 thì sửa thành: user.role !== 1
  if (user.role !== 'admin' && user.role !== 1) {
    alert("Dừng lại! Khu vực này chỉ dành cho quản trị viên.");
    return <Navigate to="/" />;
  }

  // Nếu mọi thứ ổn, cho phép truy cập
  return children;
};

export default AdminRoute;