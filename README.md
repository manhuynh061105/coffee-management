# ☕ Beans Café - Coffee Ordering & Management System

**Beans Café** là hệ thống website thương mại điện tử chuyên biệt dành cho cửa hàng cà phê. Dự án tập trung vào việc tối ưu hóa trải nghiệm đặt hàng cho người dùng và cung cấp công cụ quản trị mạnh mẽ cho Admin với giao diện Espresso hiện đại.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

- **Frontend:** React.js, React Context API, React Router, Bootstrap 5, React-Toastify.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas.
- **Styling:** CSS3 (Custom Espresso Theme), FontAwesome.

---

## 📖 Hướng dẫn sử dụng (User & Admin Flow)

### 👤 Quy trình dành cho Khách hàng (User Flow)
1.  **Khởi đầu:** Người dùng truy cập trang chủ, thực hiện **Đăng ký** tài khoản mới hoặc **Đăng nhập** vào hệ thống.
2.  **Chọn món:** Di chuyển đến trang **Menu** để xem danh sách cà phê. Tại đây, người dùng có thể lọc sản phẩm theo nhu cầu.
3.  **Xem chi tiết:** Nhấn vào từng sản phẩm để tới trang **Chi tiết sản phẩm**, xem mô tả và giá cả cụ thể.
4.  **Giỏ hàng:** Thêm các món yêu thích vào **Giỏ hàng**. Tại trang Cart, hệ thống hỗ trợ tính toán tổng tiền và quản lý số lượng sản phẩm.
5.  **Thanh toán:** Kiểm tra lại thông tin đơn hàng, ghi chú địa chỉ và thực hiện **Đặt hàng**.
6.  **Quản lý đơn:** Sau khi đặt hàng thành công, người dùng vào **Lịch sử đơn hàng** để theo dõi trạng thái. Khi đã nhận được hàng, người dùng nhấn nút **"Đã nhận"** để hoàn tất quy trình.

### 🔑 Quy trình dành cho Quản trị viên (Admin Flow)
1.  **Truy cập:** Admin đăng nhập vào hệ thống với quyền quản trị để vào Dashboard.
2.  **Quản lý sản phẩm (CRUD):** - **Thêm:** Tạo mới sản phẩm với tên, giá, ảnh và mô tả.
    - **Sửa:** Cập nhật thông tin các món trong menu khi có sự thay đổi.
    - **Xóa:** Loại bỏ các sản phẩm không còn kinh doanh.
3.  **Thống kê (Analytics):** Truy cập trang Dashboard để xem báo cáo **Thống kê doanh thu** và quản lý tổng quan hoạt động kinh doanh của cửa hàng.

---

## 🛠 Cài đặt và Chạy dự án (Installation)

### 1. Yêu cầu hệ thống
- Node.js (v14 trở lên)
- Git

### 2. Các bước cài đặt
```bash
# Clone dự án từ GitHub
git clone [https://github.com/manhuynh061105/coffee-management](https://github.com/manhuynh061105/coffee-management)

# Thiết lập cho Backend
cd backend
npm install
npm start

# Thiết lập cho Frontend
cd ../frontend
npm install
npm start