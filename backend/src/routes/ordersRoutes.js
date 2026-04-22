import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getStats,
  getOrdersByUser // 1. Thêm hàm này vào phần import
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/stats", getStats);
router.get("/", getOrders);

// 2. THÊM ROUTE NÀY: Để người dùng xem lịch sử của chính họ
router.get("/user/:userId", getOrdersByUser); 

router.put("/:id", updateOrderStatus);

export default router;