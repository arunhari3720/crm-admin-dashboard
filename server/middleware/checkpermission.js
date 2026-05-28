const Permission = require("../models/permissionmodel");

const checkPermission = (moduleName) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!userRole) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // 🔥 Get permissions
      const permission = await Permission.findOne({ role: userRole })
        .populate("modules");

      if (!permission) {
        return res.status(403).json({
          success: false,
          message: "No permissions assigned",
        });
      }

      // 🔥 Check access
      const hasAccess = permission.modules.some(
        (mod) => mod.name.toLowerCase() === moduleName.toLowerCase()
      );

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: `Access denied for ${moduleName}`,
        });
      }

      next();
    } catch (error) {
      console.error("PERMISSION ERROR:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
const checkformpermission = (action) => {
  return async (req, res, next) => {
    try {
      const role = req.user.role;

      const permission = await Permission.findOne({
        role,
      });

      if (!permission) {
        return res.status(403).json({
          success: false,
          message: "No permissions assigned",
        });
      }

      const hasAccess =
        permission.formpermissions?.[action];

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: `No permission to ${action} forms`,
        });
      }

      next();
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = checkPermission;
module.exports = checkformpermission;