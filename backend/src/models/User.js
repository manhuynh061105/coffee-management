import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username không được để trống"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password không được để trống"],
      minlength: [6, "Password phải có ít nhất 6 ký tự"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
