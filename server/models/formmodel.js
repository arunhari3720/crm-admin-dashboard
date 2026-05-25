const mongoose = require("mongoose");

const form_schema = new mongoose.Schema(
  {
    data: {
      type: Object,
      required: true
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("form", form_schema);