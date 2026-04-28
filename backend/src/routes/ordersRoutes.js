import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getStats,
  getOrdersByUser,
  getOrderById,
  deleteOrder,
} from "../controllers/ordersController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// - Route cho người dùng
router.post("/", verifyToken, createOrder);
router.get("/user/:userId", verifyToken, getOrdersByUser);

// - Route cho admin
router.get("/stats", verifyToken, isAdmin, getStats);
router.get("/", verifyToken, isAdmin, getOrders);
router.get("/:id", verifyToken, isAdmin, getOrderById);
router.put("/:id", verifyToken, updateOrderStatus);
router.delete("/:id", verifyToken, isAdmin, deleteOrder);

export default router;
