import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import bloodGroupDetailsContoller from "../controllers/analyticsController.js";

const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", verifyToken, bloodGroupDetailsContoller);

export default router;
