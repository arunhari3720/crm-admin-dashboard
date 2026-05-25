const mongoose = require("mongoose");

const project_schema = new mongoose.Schema(
  {
    name: String,
    status: String,
    revenue: Number,
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", project_schema);

module.exports = Project;