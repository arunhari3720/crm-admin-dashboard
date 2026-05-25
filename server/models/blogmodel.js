const mongoose = require("mongoose");

const blogschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
     image: String, // ✅ new
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogschema);