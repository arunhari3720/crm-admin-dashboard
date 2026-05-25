const Permission = require("../models/permissionmodel");

// 🔥 ASSIGN PERMISSIONS
const setPermissions = async (req, res) => {
  try {
    const { role, modules } = req.body;

    if (!role || !modules) {
      return res.status(400).json({
        success: false,
        message: "Role and modules required",
      });
    }

    const updated = await Permission.findOneAndUpdate(
      { role },
      { modules },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("SET PERMISSION ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔥 GET USER PERMISSIONS
const getMyPermissions = async (req, res) => {
  try {
    const userRole = req.user.role;

    const permission = await Permission.findOne({ role: userRole })
      .populate("modules");

    res.json({
      success: true,
      data: permission?.modules || [],
    });
  } catch (error) {
    console.error("GET PERMISSION ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPermissionByRole = async (req, res) => {
  try {

    const { role } = req.params;

    const permission = await Permission.findOne({ role })
      .populate("modules");

    res.json({
      success: true,
      data: permission?.modules || [],
    });

  } catch (error) {

    console.error("GET ROLE PERMISSION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  setPermissions,
  getMyPermissions,
  getPermissionByRole,
};