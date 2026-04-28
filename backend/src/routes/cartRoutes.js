import express from "express";

import { syncCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", syncCart);
router.get("/:userId", getCart);

export default router;
