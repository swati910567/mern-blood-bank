import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User Is already registered",
      });
    }
    //hash password
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    //save data
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Register Api",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const alreadyExistingUser = await User.findOne({ email: req.body.email });
    if (!alreadyExistingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //check role
    if (alreadyExistingUser.role !== req.body.role) {
      return res.status(500).json({
        success: false,
        message: "Role doesn't match",
      });
    }

    //compare password
    const comparePassword = await bcryptjs.compare(
      req.body.password,
      alreadyExistingUser.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { userId: alreadyExistingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      alreadyExistingUser,
    });
  } catch (error) {
    console.log(error);
    res.statu.json({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

export const currentUserController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};
