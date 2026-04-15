import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

mongoose.connect("mongodb://127.0.0.1:27017/coffee");
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});