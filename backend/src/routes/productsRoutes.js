import express from "express";
import multer from "multer";
import path from "path";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productsController.js";
import {
  verifyToken,
  isAdmin
} from "../middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img'); 
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = Date.now() + fileExt;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", verifyToken, isAdmin, upload.single('image'), createProduct);
router.put("/:id", verifyToken, isAdmin, upload.single('image'), updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;