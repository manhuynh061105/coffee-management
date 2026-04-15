import Cart from '../models/Cart.js';

// 1. Đồng bộ giỏ hàng (Lưu hoặc Cập nhật)
export const syncCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Thiếu UserId" });
    }

    // Sử dụng findOneAndUpdate với upsert và bỏ qua kiểm tra version
    const cart = await Cart.findOneAndUpdate(
      { userId: userId }, // Tìm theo userId
      { $set: { items: items } }, // Ép ghi đè mảng items mới
      { 
        new: true, 
        upsert: true, // Nếu không có thì tạo mới
        runValidators: true 
      }
    );

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error("Lỗi tại syncCart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Lấy giỏ hàng của user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // Nếu không tìm thấy, trả về mảng rỗng để Frontend không bị lỗi map()
      return res.status(200).json({ success: true, data: { items: [] } });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("[Cart Error] Get thất bại:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};