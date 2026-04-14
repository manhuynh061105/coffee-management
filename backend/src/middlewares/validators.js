import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('username').notEmpty().withMessage('Username không được để trống'),
  body('password').isLength({ min: 6 }).withMessage('Password phải có ít nhất 6 ký tự'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Trả về ĐÚNG format Validation Error mà em đã quy định
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];