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
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username và password là bắt buộc",
      });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Người dùng đã tồn tại"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role || "user"
    });

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

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username và password là bắt buộc",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản không tồn tại"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu không chính xác"
      });
    }

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