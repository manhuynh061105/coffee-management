import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"; // Vẫn giữ để sử dụng nếu cần, nhưng quan trọng là hàm kết nối
import path from "path";
import { fileURLToPath } from "url";

// 1. IMPORT file db.js (Giả sử bạn đã tạo file này như hướng dẫn trước)
import connectDB from "./config/db.js"; 

import productRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

// 2. GỌI KẾT NỐI DATABASE NGAY ĐẦU
connectDB(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/img", express.static(path.join(__dirname, "..", "public", "img")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Coffee Management API is running ☕" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Đường dẫn không tồn tại" });
});

const PORT = process.env.PORT || 10000;

// 3. LƯU Ý: Render đôi khi không cần '0.0.0.0' nhưng thêm vào cho chắc chắn
app.listen(PORT, "0.0.0.0", () => {
    console.log(`
🚀 Server is running!
📡 Port: ${PORT}
🌍 Mode: ${process.env.NODE_ENV || 'development'}
    `);
});