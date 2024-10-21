import { User } from "../models/userModel.js";

export const tokenverify = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    //check admin
    if (user?.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "AUth Fialed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};
