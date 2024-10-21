import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

import {
  createInventoryController,
  getDonarController,
  getHospitalController,
  getInventoryController,
  getInventoryHospitalController,
  getOrganisationForHospitalController,
  getOrgnaisationController,
  getRecentInventoryController,
} from "../controllers/inventoryController.js";
const router = express.Router();

//routes

//Add inventory
router.post("/create-inventory", verifyToken, createInventoryController);
//get all blood records
router.get("/get-inventory", verifyToken, getInventoryController);
router.get("/get-donars", verifyToken, getDonarController);
router.get("/get-hospitals", verifyToken, getHospitalController);
router.get("/get-organisation", verifyToken, getOrgnaisationController);
router.get(
  "/get-organisation-for-hospital",
  verifyToken,
  getOrganisationForHospitalController
);
router.post(
  "/get-inventory-hospital",
  verifyToken,
  getInventoryHospitalController
);

router.get("/get-recent-inventory", verifyToken, getRecentInventoryController);

export default router;
