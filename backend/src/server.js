import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Coffee Management API is running ☕"
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