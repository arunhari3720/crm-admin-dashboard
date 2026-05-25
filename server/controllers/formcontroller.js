const form = require("../models/formmodel");
const validatefields = require("../utils/validatefields");

// create form entry
const createform = async (req, res) => {
  try {
    const data = req.body;
    const role = req.user.role;

    const validation = await validatefields(data, role);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    const newform = await form.create({
      data,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      data: newform
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  createform
};