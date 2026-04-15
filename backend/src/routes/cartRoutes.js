import express from 'express';
import { syncCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

// Route đồng bộ (Lưu/Cập nhật)
router.post('/', syncCart);

// Route lấy dữ liệu
router.get('/:userId', getCart);

export default router;