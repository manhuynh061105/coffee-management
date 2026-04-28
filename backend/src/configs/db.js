import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // - Kiểm tra nếu biến môi trường
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // - Kết nối đến MongoDB Atlas
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected Successfully!");
    }
    catch (error) {
      console.error("MongoDB Connection Failed:", error.message);
      process.exit(1);
  }
};

export default connectDB;