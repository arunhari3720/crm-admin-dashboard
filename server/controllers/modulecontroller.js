const Module = require("../models/modulemodel");

// 🔥 CREATE MODULE (ADMIN)
const createModule = async (req, res) => {
  try {
    const { name, path, icon } = req.body;

    if (!name || !path) {
      return res.status(400).json({
        success: false,
        message: "Name and path are required",
      });
    }

    const exists = await Module.findOne({ path });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Module already exists",
      });
    }

    const module = await Module.create({
      name,
      path,
      icon,
    });

    res.json({
      success: true,
      data: module,
    });
  } catch (error) {
    console.error("CREATE MODULE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔥 GET ALL MODULES
const getModules = async (req, res) => {
  try {
    const modules = await Module.find({ isActive: true });

    res.json({
      success: true,
      data: modules,
    });
  } catch (error) {
    console.error("GET MODULE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateModule = async (req, res) => {
  try {

    const { id } = req.params;

    const updated = await Module.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createModule,
  getModules,
  updateModule
};