const mongoose = require("mongoose");

const customerformschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "progress", "closed"],
      default: "new",
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.customerform ||
  mongoose.model("customerform", customerformschema);