const mongoose = require("mongoose");

const fileschema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    fileurl: {
      type: String,
      required: true,
    },

    publicid: {
      type: String,
      required: true,
    },

    resourcetype: {
      type: String,
      required: true,
    },

    mimetype: {
      type: String,
      required: true,
    },

    filesize: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "file",
  fileschema
);