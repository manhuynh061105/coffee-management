import express from "express";
import multer from "multer";
import path from "path";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productsController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- Cấu hình Multer tối ưu ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Thầy dùng đường dẫn tương đối từ gốc project, 
    // hãy chắc chắn em đã tạo thư mục: backend/public/img
    cb(null, 'public/img'); 
  },
  filename: (req, file, cb) => {
    // Chỉ giữ lại đuôi file, tên file thay bằng timestamp để tránh lỗi ký tự lạ
    const fileExt = path.extname(file.originalname);
    const fileName = Date.now() + fileExt;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage,
  // Thêm giới hạn dung lượng file (ví dụ 5MB) để bảo vệ server
  limits: { fileSize: 5 * 1024 * 1024 } 
});

// Các Routes giữ nguyên
router.get("/", getProducts);
router.post("/", verifyToken, isAdmin, upload.single('image'), createProduct);
router.put("/:id", verifyToken, isAdmin, upload.single('image'), updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;