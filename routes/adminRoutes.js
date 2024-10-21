import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { tokenverify } from "../middlewares/adminMiddleware.js";
import {
  deleteDonarController,
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
} from "../controllers/adminController.js";
const router = express.Router();

//Routes

//GET || DONAR LIST
router.get("/donar-list", verifyToken, tokenverify, getDonarsListController);
//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  verifyToken,
  tokenverify,
  getHospitalListController
);
//GET || ORG LIST
router.get("/org-list", verifyToken, tokenverify, getOrgListController);
// ==========================

// DELETE DONAR || GET
router.delete(
  "/delete-donar/:id",
  verifyToken,
  tokenverify,
  deleteDonarController
);

//EXPORT
export default router;
