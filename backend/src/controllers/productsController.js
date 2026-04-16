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

// --- Lấy chi tiết 1 sản phẩm ---
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm sản phẩm theo ID trong Database
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Rất tiếc, không tìm thấy sản phẩm này"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chi tiết sản phẩm thành công",
      data: product
    });

  } catch (error) {
    console.error("Lỗi Get Product By Id:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error: ID không hợp lệ hoặc lỗi hệ thống"
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    // 1. Lấy dữ liệu từ body và file từ multer
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : "default-coffee.jpg";

    // 2. Ép kiểu price sang Number (vì FormData luôn gửi lên String)
    const numericPrice = Number(price);

    // 3. Kiểm tra các trường bắt buộc
    if (!name || isNaN(numericPrice) || !category) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ Name, Price (phải là số) và Category"
      });
    }

    // 4. Tạo sản phẩm mới trong Database
    const product = await Product.create({
      name,
      price: numericPrice,
      category,
      image // Đã bao gồm ảnh ở đây
    });

    res.status(201).json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: product
    });

  } catch (error) {
    console.error("Lỗi Create Product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message
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