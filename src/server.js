import express from "express";
import dotenv from "dotenv";
import cors from "cors";
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

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});