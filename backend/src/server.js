import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path"; // Thêm dòng này
import { fileURLToPath } from "url"; // Thêm dòng này

import productRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

// Thiết lập __dirname cho ESM (Vì em dùng import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// QUAN TRỌNG: Middleware để đọc dữ liệu từ FormData (Multer cần cái này)
app.use(express.urlencoded({ extended: true }));

// SỬA LẠI DÒNG NÀY: 
// Dùng ".." để nhảy ra khỏi thư mục src, sau đó mới vào public/img
app.use("/img", express.static(path.join(__dirname, "..", "public", "img")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Coffee Management API is running ☕"
  });
});

// Middleware xử lý Route không tồn tại
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Đường dẫn (Route) không tồn tại"
  });
});

// Connect Database
mongoose.connect("mongodb://127.0.0.1:27017/coffee");
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 Server is running!
📡 Port: ${PORT}
🌍 Mode: ${process.env.NODE_ENV || 'development'}
    `);
});