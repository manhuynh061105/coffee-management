import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getStats
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);
router.get("/stats", getStats);

export default router;