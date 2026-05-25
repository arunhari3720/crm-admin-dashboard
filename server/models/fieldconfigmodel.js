const mongoose = require("mongoose");

const fieldconfig_schema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    unique: true
  },
  roles: {
    admin: { type: Boolean, default: true },
    user: { type: Boolean, default: true }
  }
});

module.exports = mongoose.model("fieldconfig", fieldconfig_schema);