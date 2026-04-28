import Cart from '../models/Cart.js';

export const syncCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu UserId"
      });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Cart Items phải là một mảng",
      });
    }

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

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu UserId",
      });
    }

    const cart = await Cart.findOne({ userId });

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