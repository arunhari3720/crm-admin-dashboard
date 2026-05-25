const mongoose = require("mongoose");

const event_schema = new mongoose.Schema({
  title: String,
  datetime: Date,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

// ✅ SAFE MODEL EXPORT
module.exports =
  mongoose.models.event ||
  mongoose.model("event", event_schema);