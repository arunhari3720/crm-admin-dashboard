const Field = require("../models/fieldconfigmodel");

// ========================================
// 🔥 CREATE OR UPDATE (BY FIELD NAME)
// ========================================
const setfield = async (req, res) => {
  try {
    const { field, roles } = req.body;

    // ✅ validation
    if (!field || !field.trim()) {
      return res.status(400).json({
        success: false,
        message: "Field name is required",
      });
    }

    const updated = await Field.findOneAndUpdate(
      { field: field.trim() },
      {
        field: field.trim(), // ✅ ensure field is stored
        roles: {
          admin: true,
          user: roles?.user || false,
        },
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("SET FIELD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// 🔥 GET ALL FIELDS
// ========================================
const getfields = async (req, res) => {
  try {
    const data = await Field.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET FIELDS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// 🔥 DELETE FIELD
// ========================================
const deletefield = async (req, res) => {
  try {
    const { fieldname } = req.params;

    const deleted = await Field.findOneAndDelete({
      field: fieldname,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Field not found",
      });
    }

    res.json({
      success: true,
      message: "Field deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// 🔥 UPDATE FIELD BY ID
// ========================================
const updatefield = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, roles } = req.body;

    // ✅ validation
    if (!field || !field.trim()) {
      return res.status(400).json({
        success: false,
        message: "Field name is required",
      });
    }

    // ✅ prevent duplicate field names
    const existing = await Field.findOne({
      field: field.trim(),
      _id: { $ne: id },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Field name already exists",
      });
    }

    const updated = await Field.findByIdAndUpdate(
      id,
      {
        field: field.trim(),
        roles: {
          admin: true,
          user: roles?.user || false,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Field not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  setfield,
  getfields,
  deletefield,
  updatefield,
};