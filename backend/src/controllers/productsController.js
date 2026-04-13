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

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Thiếu name hoặc price"
      });
    }

    if (typeof price !== "number") {
      return res.status(400).json({
        success: false,
        message: "Price phải là số"
      });
    }

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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    // validate
    if (price !== undefined && typeof price !== "number") {
      return res.status(400).json({
        success: false,
        message: "Price phải là số"
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, category },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.status(200).json({
      success: true,
      message: "Xoá sản phẩm thành công"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};