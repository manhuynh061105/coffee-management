import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, // Đổi từ ObjectId sang String để đồng bộ với Frontend
    required: true,
    unique: true // Mỗi User chỉ có duy nhất 1 giỏ hàng
  },
  items: [{
    _id: String, 
    name: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;