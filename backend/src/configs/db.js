import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI chưa được cấu hình trong .env");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB Đã Kết Nối Thành Công!");
  }
  catch (error) {
      console.error("MongoDB Kết Nối Thất Bại:", error.message);
      process.exit(1);
  }
};

export default connectDB;