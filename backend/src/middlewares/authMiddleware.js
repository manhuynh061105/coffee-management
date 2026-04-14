import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Lấy token từ header "Authorization"
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào request để các hàm sau sử dụng
    next(); // Cho phép đi tiếp vào Controller
  } catch (error) {
    res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// Middleware kiểm tra quyền Admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Quyền truy cập bị từ chối. Chỉ dành cho Admin!" });
  }
};