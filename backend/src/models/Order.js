import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Tham chiếu đến Model User
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: [
    {
      // Tham chiếu đến Model Product để lấy được tên, ảnh, giá sản phẩm
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  phone: String,   // Nên thêm để hiển thị trong Pop-up
  address: String, // Nên thêm để hiển thị trong Pop-up
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "processing", "completed", "cancelled"] // Giới hạn các trạng thái
  }
}, { timestamps: true }); // Tự động tạo createdAt (ngày đặt hàng)

export default mongoose.model("Order", orderSchema);