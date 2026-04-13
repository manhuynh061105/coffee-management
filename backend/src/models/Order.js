import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "pending"
  }
});

export default mongoose.model("Order", orderSchema);