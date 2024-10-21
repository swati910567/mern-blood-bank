import { User } from "../models/userModel.js";
import { Inventory } from "../models/inventoryModel.js";
import mongoose from "mongoose";

export const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).json({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.status(201).json({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in create inventory api",
      error,
    });
  }
};

export const getInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      organisation: req.body.userId,
    })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Got all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting All inventory ",
      error,
    });
  }
};

export const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donorId = await Inventory.distinct("donar", {
      organisation,
    });
    // console.log(donorId);
    const donars = await User.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

export const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await Inventory.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await User.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).json({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

export const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await Inventory.distinct("organisation", { donar });
    //find org
    const organisations = await User.find({
      _id: { $in: orgId },
    });
    return res.status(200).json({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};

export const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await Inventory.distinct("organisation", { hospital });
    //find org
    const organisations = await User.find({
      _id: { $in: orgId },
    });
    return res.status(200).json({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

export const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

export const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      organisation: req.body.userId,
    })
      .limit(4)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};
