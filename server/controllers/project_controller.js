const Project = require("../models/project_model");


// 📌 CREATE PROJECT
const create_project = async (req, res) => {
  try {
    const new_project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      project: new_project,
      message: "Project created successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// 📌 GET ALL PROJECTS (PAGINATION)
const get_projects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const total = await Project.countDocuments();

    const project_list = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects: project_list,
      total_pages: Math.ceil(total / limit),
      current_page: page,
      message: "Projects fetched successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// 📌 GET SINGLE PROJECT
const get_project_by_id = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      project
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// 📌 UPDATE PROJECT
const update_project = async (req, res) => {
  try {
    const updated_project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated_project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      project: updated_project,
      message: "Project updated successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// 📌 DELETE PROJECT
const delete_project = async (req, res) => {
  try {
    const deleted_project = await Project.findByIdAndDelete(req.params.id);

    if (!deleted_project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


module.exports = {
  create_project,
  get_projects,
  get_project_by_id,
  update_project,
  delete_project
};