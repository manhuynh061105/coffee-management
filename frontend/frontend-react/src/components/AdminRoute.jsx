import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Nếu không phải admin, đá về trang chủ hoặc trang Login
  if (!user || user.role !== 'admin') {
    alert("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;