import Order from "../models/Order.js";

let orders = [];

export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId hoặc items"
      });
    }

    // tính tổng (tạm)
    const total = items.reduce((sum, item) => {
      return sum + item.quantity * 20000;
    }, 0);

    const newOrder = await Order.create({
      userId,
      items,
      total
    });

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công",
      data: newOrder
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.json({
      success: true,
      message: "Lấy danh sách đơn hàng thành công",
      data: orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};