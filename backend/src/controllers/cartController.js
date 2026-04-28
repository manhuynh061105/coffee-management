import Cart from '../models/Cart.js';

// - Đồng bộ giỏ hàng (Lưu hoặc Cập nhật)
export const syncCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // - Kiểm tra nếu thiếu userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu UserId"
      });
    }

    // - Kiểm tra nếu items không phải là mảng
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Cart Items phải là một mảng",
      });
    }

    // - Sử dụng findOneAndUpdate với upsert và bỏ qua kiểm tra version
    const cart = await Cart.findOneAndUpdate(
      { userId: userId },
      { $set: { items: items } },
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );

    res.status(200).json({
      success: true,
      data: cart
    });
  }
  catch (error) {
    console.error("Lỗi tại syncCart:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// - Lấy giỏ hàng của user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // - Kiểm tra nếu thiếu userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const cart = await Cart.findOne({ userId });

    // - Nếu không tìm thấy giỏ hàng, trả về mảng rỗng để Frontend không bị lỗi map()
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [] }
      });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  }
  catch (error) {
    console.error("[Cart Error] Get thất bại:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};