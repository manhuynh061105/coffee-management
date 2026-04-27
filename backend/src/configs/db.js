import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cấu hình dotenv để đọc file .env
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in environment variables!");
        }

        const conn = await mongoose.connect(mongoURI);
        
        console.log(`=== MongoDB Connected: ${conn.connection.host} ===`);
    } catch (error) {
        console.error(`!!! MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Dừng server nếu lỗi
    }
};

export default connectDB;