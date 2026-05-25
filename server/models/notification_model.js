const mongoose = require("mongoose");

const notification_schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  type: {
    type: String,
    enum: ["birthday", "system", "alert", "meeting"],
    default: "system"
  },
  title: String,
  message: String,
  reference_id: mongoose.Schema.Types.ObjectId,
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// ✅ SAFE MODEL EXPORT
module.exports =
  mongoose.models.notification ||
  mongoose.model("notification", notification_schema);