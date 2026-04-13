import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getStats
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/stats", getStats);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);

export default router;