import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(201)
        .json({ message: "You are Already Registred", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Enter the credential", success: true });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Please Register First", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }
    const tokenData = {
      id: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // recommended for security
        secure: process.env.NODE_ENV === "production", // set true in production
        sameSite: "Lax", // or 'Strict' / 'None' depending on use case
      })
      .json({
        message: "Login Successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "")
    .json({ message: " logout successfully", success: true });
};
