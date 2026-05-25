const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: String,
  email: String,

  dynamicfields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);