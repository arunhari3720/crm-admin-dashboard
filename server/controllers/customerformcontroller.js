const customerform = require("../models/customerformmodel");

const createform = async (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    const newform = await customerform.create({
      name,
      email,
      phone,
      company,
      status,
      created_by: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Form created successfully",
      data: newform,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getforms = async (req, res) => {
  try {
    const data = await customerform
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getformbyid = async (req, res) => {
  try {
    const data = await customerform.findById(
      req.params.id
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateform = async (req, res) => {
  try {
    const updated = await customerform.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Form updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteform = async (req, res) => {
  try {
    const deleted =
      await customerform.findByIdAndDelete(
        req.params.id
      );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createform,
  getforms,
  getformbyid,
  updateform,
  deleteform,
};