import Order from "../models/Order.js";
import Product from "../models/product.js";

// 1. TẠO ĐƠN HÀNG (Cập nhật để lưu thêm Phone, Address, Note)
export const createOrder = async (req, res) => {
  try {
    const { userId, items, phone, address, note } = req.body;
    let total = 0;
    
    // Validation cơ bản
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống hoặc thiếu thông tin người dùng"
      });
    }

    if (!phone || !address) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp số điện thoại và địa chỉ giao hàng"
        });
      }
    
    // Tính toán lại tổng tiền từ DB (để tránh user can thiệp giá từ frontend)
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

    const newOrder = await Order.create({
      userId,
      items,
      total,
      phone,   // Lưu thêm SĐT
      address, // Lưu thêm địa chỉ
      note,     // Lưu thêm ghi chú
      status: "pending"
    });

    // Sau khi tạo xong, mình populate thông tin sản phẩm luôn để trả về cho Pop-up Success ở Frontend
    const populatedOrder = await Order.findById(newOrder._id).populate('items.productId');

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công",
      data: populatedOrder 
    });

  } catch (error) {
    console.error("Lỗi Create Order:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi tạo đơn hàng"
    });
  }
};

// 2. LẤY TẤT CẢ ĐƠN HÀNG (Dành cho Admin)
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3. LẤY LỊCH SỬ ĐƠN HÀNG CỦA USER (Chức năng em mới thêm)
export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Tìm tất cả đơn hàng của user đó
    const orders = await Order.find({ userId: userId })
      .populate({
        path: 'items.productId',
        select: 'name image price' // Chỉ lấy các trường cần thiết để nhẹ dữ liệu
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy lịch sử đơn hàng",
      error: error.message
    });
  }
};

// 4. CẬP NHẬT TRẠNG THÁI (Dành cho Admin duyệt đơn)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 5. THỐNG KÊ (Dành cho Dashboard Admin)
export const getStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.total, 0);
    const pendingCount = orders.filter(order => order.status === 'pending').length;

    res.json({
      success: true,
      data: { totalOrders, totalRevenue, pendingCount }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi lấy thống kê" });
  }
};

// Thêm hoặc sửa lại hàm này trong ordersController.js
export const confirmReceived = async (req, res) => {
  try {
    const { id } = req.params; // ID của đơn hàng

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "completed" }, // Chuyển trạng thái thành hoàn thành
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json({
      success: true,
      message: "Xác nhận đã nhận hàng thành công!",
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};