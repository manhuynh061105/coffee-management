import express from "express";
import { getProducts } from "../controllers/productsController.js";
import { createProduct } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;