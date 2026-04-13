import Order from "../models/Order.js";
import Product from "../models/product.js";

let orders = [];

export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    let total = 0;
    
    if (!userId || !items) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId hoặc items"
      });
    }
    
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Sản phẩm không tồn tại"
        });
      }

      total += product.price * item.quantity;
    }

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
    const {status} = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter);

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