import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getStats,
  getOrdersByUser,
  getOrderById,
  deleteOrder
} from "../controllers/ordersController.js";
// Import middleware bảo mật (Thay đổi đường dẫn cho đúng với project của em)
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- ROUTE CHO USER (Cần đăng nhập) ---
router.post("/", verifyToken, createOrder); 
router.get("/user/:userId", verifyToken, getOrdersByUser); 

// --- ROUTE CHO ADMIN (Bắt buộc phải là Admin) ---
router.get("/stats", verifyToken, isAdmin, getStats); 
router.get("/", verifyToken, isAdmin, getOrders); 
router.get("/:id", verifyToken, isAdmin, getOrderById); 
router.put("/:id", verifyToken, updateOrderStatus); 
router.delete("/:id", verifyToken, isAdmin, deleteOrder); 

export default router;