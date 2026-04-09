let orders = [];

export const createOrder = (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products) {
    return res.status(400).json({
      success: false,
      message: "Thiếu userId hoặc products"
    });
  }

  // tính tổng tiền (fake)
  const total = products.reduce((sum, item) => {
    return sum + item.quantity * 20000; // tạm fix giá
  }, 0);

  const newOrder = {
    id: "o" + (orders.length + 1),
    userId,
    products,
    total,
    status: "pending"
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: "Tạo đơn hàng thành công",
    data: newOrder
  });
};

export const getOrders = (req, res) => {
  res.json({
    success: true,
    message: "Lấy danh sách đơn hàng thành công",
    data: orders
  });
};

export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy đơn hàng"
    });
  }

  order.status = status;

  res.json({
    success: true,
    message: "Cập nhật trạng thái thành công",
    data: order
  });
};