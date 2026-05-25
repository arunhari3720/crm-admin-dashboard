const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  fieldname: String,
  label: String,
  datatype: String,
  required: Boolean,
  options: [String],
  config: Object,
}, { timestamps: true });

module.exports = mongoose.model("Field", fieldSchema);