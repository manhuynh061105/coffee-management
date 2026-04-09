const products = [
  { id: "p1", name: "Cà phê sữa", price: 20000, category: "coffee" }
];

export const getProducts = (req, res) => {
  res.json({
    success: true,
    message: "Lấy sản phẩm thành công",
    data: products
  });
};