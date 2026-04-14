export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Lỗi Server nội bộ",
    // Chỉ hiện stack lỗi khi đang ở môi trường phát triển (development)
    stack: process.env.NODE_ENV === 'development' ? err.stack : null 
  });
};