import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  // Log này giúp bạn kiểm tra trên Render xem nó đã đọc đúng link Atlas chưa
  console.log("Attempting to connect to:", uri ? "Atlas (Remote)" : "Localhost/Undefined");

  try {
    await mongoose.connect(uri);
    console.log("=== MongoDB Connected Successfully! ===");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;