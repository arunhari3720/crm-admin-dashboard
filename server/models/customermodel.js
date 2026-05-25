const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: String,
  email: String,
  contact: String,
  totalprice: Number,
  discount: Number,
  finalprice: Number,
}, { timestamps: true });

module.exports =
  mongoose.models.customer || mongoose.model("customer", customerSchema);