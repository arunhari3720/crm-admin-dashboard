const mongoose = require("mongoose");

const excelSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true } // ✅ for createdAt
);

module.exports = mongoose.model("exceldata", excelSchema);