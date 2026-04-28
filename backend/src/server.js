import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// - Import các module khác
import connectDB from "./configs/db.js"; 
import productRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

// - Tải biến môi trường từ file .env
dotenv.config();

// - Kết nối đến MongoDB Atlas
connectDB(); 
const app = express();
const PORT = process.env.PORT || 10000;

// - Xác định __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// - Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// - Static files
app.use("/img", express.static(path.join(__dirname, "..", "public", "img")));

// - API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// - Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Quản Lý Cà Phê Đang Chạy ☕",
  });
});


// - 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Không tìm thấy endpoint này",
  });
});

// - Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`
🚀 Máy chủ đang chạy!
📡 Port: ${PORT}
🌍 Mode: ${process.env.NODE_ENV || 'development'}
    `);
});