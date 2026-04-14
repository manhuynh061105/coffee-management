import express from 'express';
// Sửa dòng này: Thêm login vào danh sách các hàm được import
import { register, login } from '../controllers/authController.js'; 
import { validateRegister } from '../middlewares/validators.js';

const router = express.Router();

router.post('/register', validateRegister, register);

// Bây giờ dòng này mới chạy được vì 'login' đã được định nghĩa ở trên
router.post('/login', login); 

export default router;