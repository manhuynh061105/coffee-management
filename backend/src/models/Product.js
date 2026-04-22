import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Tên sản phẩm là bắt buộc"] 
    },
    price: { 
      type: Number, 
      required: [true, "Giá sản phẩm là bắt buộc"],
      min: [0, "Giá không được nhỏ hơn 0"]
    },
    category: { 
      type: String, 
      required: [true, "Danh mục là bắt buộc"] 
    },
    image: { 
      type: String, 
      default: "default-coffee.jpg" // Ảnh mặc định nếu admin không tải ảnh lên
    }
  },
  { 
    timestamps: true // Tự động thêm createdAt và updatedAt (rất cần cho Admin quản lý)
  }
);

// Kiểm tra nếu model đã tồn tại thì dùng lại, chưa có thì mới tạo mới (tránh lỗi OverwriteModelError)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
