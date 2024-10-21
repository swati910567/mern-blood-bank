import express from "express";
import {
  registerController,
  loginController,
  currentUserController,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/current-user", verifyToken, currentUserController);

export default router;
