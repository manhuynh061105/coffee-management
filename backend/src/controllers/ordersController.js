import Order from "../models/Order.js";
import Product from "../models/Product.js";

// 1. TẠO ĐƠN HÀNG (Cập nhật để lưu thêm customerName)
export const createOrder = async (req, res) => {
  try {
    // Thêm customerName vào destructuring từ req.body
    const { items, phone, address, note, customerName } = req.body;
    
    // LẤY userId TỪ TOKEN
    const userId = req.user.id; 

    let total = 0;
    
    // Kiểm tra giỏ hàng
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
    
    // Tính toán tổng tiền dựa trên giá thực tế từ Database (tránh client sửa giá)
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

    // Tạo đơn hàng mới với trường customerName
    const newOrder = await Order.create({
      userId, 
      customerName, // <--- Đã thêm trường này
      items,
      totalAmount: total, // Lưu ý: Trong model của bạn là total hay totalAmount? 
             // Hãy đảm bảo tên trường ở đây khớp với Schema (Order.js)
      phone,
      address,
      note,
      status: "pending"
    });

    const populatedOrder = await Order.findById(newOrder._id).populate('items.productId');

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công tại Beans Café!",
      data: populatedOrder 
    });

  } catch (error) {
    console.error("Lỗi Create Order:", error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống: " + error.message });
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
// 3. LẤY LỊCH SỬ ĐƠN HÀNG - Fix để lấy theo Token
export const getOrdersByUser = async (req, res) => {
  try {
    // Ưu tiên lấy từ Token, nếu không có mới lấy từ Params
    const userId = req.user.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Không xác định được người dùng" });
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi: " + error.message });
  }
};

// CẬP NHẬT TRẠNG THÁI (Dành cho cả Admin duyệt và User xác nhận)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Lấy thông tin từ Middleware verifyToken (đảm bảo middleware đã gán req.user)
    const userIdFromToken = req.user.id; 
    const userRole = req.user.role;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    // --- PHÂN QUYỀN LOGIC ---
    if (userRole === "admin") {
      // Admin có toàn quyền
      order.status = status;
    } else {
      // KIỂM TRA TÊN TRƯỜNG: Nếu database lưu là 'user' thì dùng order.user, nếu là 'userId' thì dùng order.userId
      const orderOwnerId = order.user ? order.user.toString() : (order.userId ? order.userId.toString() : null);

      if (orderOwnerId !== userIdFromToken) {
        return res.status(403).json({ success: false, message: "Bạn không có quyền sửa đơn hàng của người khác" });
      }

      // User chỉ được phép confirm 'completed'
      if (status === "completed") {
        order.status = "completed";
      } else {
        return res.status(403).json({ success: false, message: "Người dùng chỉ có quyền xác nhận Đã nhận hàng" });
      }
    }

    // Lưu thay đổi
    await order.save();
    
    // Thực hiện populate một cách an toàn để trả về cho Frontend
    const updatedOrder = await Order.findById(id).populate('items.productId');

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: updatedOrder
    });

  } catch (error) {
    console.error("Lỗi chi tiết tại updateOrderStatus:", error); // Xem log ở terminal để biết lỗi cụ thể là gì
    res.status(500).json({ success: false, message: "Lỗi hệ thống: " + error.message });
  }
};

// 5. THỐNG KÊ (Dành cho Dashboard Admin)
export const getStats = async (req, res) => {
  try {
    const targetStatus = "completed"; 

    // 1. Lấy tất cả đơn hàng đã hoàn thành
    const allOrders = await Order.find({ status: targetStatus }); 
    
    // 2. SỬA TẠI ĐÂY: Dùng 'totalAmount' thay vì 'total'
    const totalRevenue = allOrders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0); 
    }, 0);

    const totalOrders = allOrders.length;

    // 3. Gom nhóm theo tháng cho biểu đồ
    const monthlyRevenue = await Order.aggregate([
      { 
        $match: { status: targetStatus } 
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, 
          // SỬA TẠI ĐÂY: Dùng "$totalAmount" để MongoDB hiểu đúng trường trong DB
          revenue: { $sum: "$totalAmount" } 
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 4. Định dạng tên tháng cho Recharts
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
  } catch (error) {
    console.error("Lỗi Dashboard Backend:", error);
    res.status(500).json({ success: false, message: error.message });
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

// 1. Lấy chi tiết 1 đơn hàng
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "username email") // Lấy thông tin người mua
      .populate("items.productId");         // Lấy thông tin sản phẩm

    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// 2. Xóa đơn hàng
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng để xóa" });
    }

    res.json({ success: true, message: "Đã xóa đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa đơn hàng" });
  }
};