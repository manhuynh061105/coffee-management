import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Kiểm tra user tồn tại chưa
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Người dùng đã tồn tại"
      });
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    // 4. Trả về đúng format em đã quy định
    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      data: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server: " + error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Kiểm tra user có tồn tại không
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "Tài khoản không tồn tại" });
    }

    // 2. Kiểm tra mật khẩu (so sánh pass nhập vào với pass đã hash trong DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Mật khẩu không chính xác" });
    }

    // 3. Tạo JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload: Thông tin đính kèm vào token
      process.env.JWT_SECRET,           // Secret Key (lấy từ file .env)
      { expiresIn: "1d" }               // Token có hạn trong 1 ngày
    );

    // 4. Trả về đúng format
    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: {
        token,
        user: { id: user._id, username: user.username, role: user.role }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};