import { User } from "../models/userModel.js";

//GET DONAR LIST
export const getDonarsListController = async (req, res) => {
  try {
    const donarData = await User.find({ role: "donar" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In DOnar List API",
      error,
    });
  }
};
//GET HOSPITAL LIST
export const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await User.find({ role: "hospital" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      Totalcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};
//GET ORG LIST
export const getOrgListController = async (req, res) => {
  try {
    const orgData = await User.find({ role: "organisation" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      Totalcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};
// =======================================

//DELETE DONAR
export const deleteDonarController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

//EXPORT
