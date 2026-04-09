import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      message: "Lấy sản phẩm thành công",
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const product = await Product.create({
      name,
      price,
      category
    });

    res.status(201).json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};