import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // - Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username và password là bắt buộc",
      });
    }

    // - Kiểm tra user tồn tại chưa
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Người dùng đã tồn tại"
      });
    }

    // - Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // - Tạo user mới
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role || "user"
    });

    // - Trả về đúng format em đã quy định
    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      data: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    });

  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server: " + error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // - Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username và password là bắt buộc",
      });
    }

    // - Kiểm tra user có tồn tại không
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản không tồn tại"
      });
    }

    // - Kiểm tra mật khẩu (so sánh pass nhập vào với pass đã hash trong DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu không chính xác"
      });
    }

    // - Tạo JWT Token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });

    // - Trả về đúng format
    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: {
        token,
        user: { id: user._id, username: user.username, role: user.role }
      }
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server"
    });
  }
};