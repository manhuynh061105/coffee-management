import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { items, phone, address, note, customerName } = req.body;
    
    // - Lấy userId từ token đã được verify bởi Middleware (đảm bảo middleware đã gán req.user)
    const userId = req.user.id; 

    let total = 0;
    
    // - Kiểm tra giỏ hàng
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống"
      });
    }

    // Kiểm tra thông tin nhận hàng (Bao gồm cả customerName)
    if (!phone || !address || !customerName) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp đầy đủ tên, số điện thoại và địa chỉ"
        });
    }
    
    // - Tính toán tổng tiền dựa trên giá thực tế từ Database (tránh client sửa giá)
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Sản phẩm ID ${item.productId} không tồn tại`
        });
      }
      total += product.price * item.quantity;
    }

    // - Tạo đơn hàng mới với trường customerName
    const newOrder = await Order.create({
      userId, 
      customerName,
      items,
      totalAmount: total,
      phone,
      address,
      note,
      status: "pending"
    });

    const populatedOrder = await Order
      .findById(newOrder._id)
      .populate('items.productId');

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công tại Beans Café!",
      data: populatedOrder 
    });

  }
  catch (error) {
    console.error("Lỗi Create Order:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống: " + error.message
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('items.productId', 'name image price') 
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống: " + error.message
    });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    // - Ưu tiên lấy từ Token, nếu không có mới lấy từ Params
    const userId = req.user.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Không xác định được người dùng"
      });
    }

    const orders = await Order.find({ userId: userId })
      .populate({
        path: 'items.productId',
        select: 'name image price'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi: " + error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // - Lấy thông tin từ Middleware verifyToken (đảm bảo middleware đã gán req.user)
    const userIdFromToken = req.user.id; 
    const userRole = req.user.role;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng"
      });
    }

    // - Phân quyền: Admin có thể cập nhật mọi trạng thái, User chỉ được xác nhận 'completed' cho đơn hàng của chính mình
    if (userRole === "admin") {
      // - Admin có toàn quyền
      order.status = status;
    }
    else {
      // - User chỉ có quyền cập nhật đơn hàng của chính mình
      const orderOwnerId = order.user ? order.user.toString() : (order.userId ? order.userId.toString() : null);

      if (orderOwnerId !== userIdFromToken) {
        return res.status(403).json({
          success: false,
          message: "Bạn không có quyền sửa đơn hàng của người khác"
        });
      }

      // - User chỉ được phép confirm 'completed'
      if (status === "completed") {
        order.status = "completed";
      }
      else {
        return res.status(403).json({
          success: false,
          message: "Người dùng chỉ có quyền xác nhận Đã nhận hàng"
        });
      }
    }

    // - Lưu thay đổi
    await order.save();
    
    // - Thực hiện populate một cách an toàn để trả về cho Frontend
    const updatedOrder = await Order
      .findById(id)
      .populate('items.productId');

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: updatedOrder
    });

  }
  catch (error) {
    console.error("Lỗi chi tiết tại updateOrderStatus:", error); // Xem log ở terminal để biết lỗi cụ thể là gì
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống: " + error.message
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const targetStatus = "completed";

    const allOrders = await Order.find({ status: targetStatus }); 
    
    const totalRevenue = allOrders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0); 
    }, 0);

    const totalOrders = allOrders.length;

    const monthlyRevenue = await Order.aggregate([
      { 
        $match: { status: targetStatus } 
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, 
          revenue: { $sum: "$totalAmount" } 
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonthlyData = monthlyRevenue.map(item => ({
      month: monthNames[item._id - 1],
      revenue: item.revenue
    }));

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        monthlyRevenue: formattedMonthlyData
      }
    });
  }
  catch (error) {
    console.error("Lỗi Dashboard Backend:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const confirmReceived = async (req, res) => {
  try {
    const { id } = req.params; // ID của đơn hàng

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "completed" },
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
      message: "Xác nhận đã nhận hàng thành công!",
      data: order
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống"
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "username email")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng"
      });
    }

    res.json({ success: true, data: order });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server"
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng để xóa"
      });
    }

    res.json({ success: true, message: "Đã xóa đơn hàng thành công" });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa đơn hàng"
    });
  }
};