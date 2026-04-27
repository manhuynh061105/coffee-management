import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: [true, "Họ tên người nhận là bắt buộc"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Số điện thoại là bắt buộc"],
    },
    address: {
      type: String,
      required: [true, "Địa chỉ giao hàng là bắt buộc"],
    },
    note: {
      type: String,
      default: "",
      trim: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Số lượng phải ít nhất là 1"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      // THÊM 'completed' VÀO ĐÂY ĐỂ TRÙNG VỚI FRONTEND
      enum: ["pending", "processing", "shipped", "delivered", "completed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "COD",
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;