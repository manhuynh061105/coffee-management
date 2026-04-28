import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Username không được để trống"], 
    unique: true, // Tránh trùng lặp tài khoản
    trim: true // Tự động xóa khoảng trắng thừa
  },
  password: { 
    type: String, 
    required: [true, "Password không được để trống"],
    minlength: [6, "Password phải có ít nhất 6 ký tự"]
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], // Chỉ cho phép 2 giá trị này
    default: "user" 
  }
}, { 
  timestamps: true // Tự động tạo createdAt và updatedAt (rất quan trọng để quản lý)
});

export default mongoose.model("User", userSchema);