import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productsController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. Ai cũng có thể xem danh sách sản phẩm (Public)
router.get("/", getProducts);

// 2. Chỉ Admin mới được thực hiện các thao tác này (Private)
// Lưu ý: Đã xóa các dòng thừa không có middleware phía trên
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;