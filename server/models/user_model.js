const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  dob: {
    type: Date
  },

  role: {
    type: String,

    enum: [
      "admin",
      "hr",
      "manager",
      "employee",
      "user"
    ],

    default: "user"
  },

  department: {
    type: String
  },

  designation: {
    type: String
  },

  status: {
    type: String,

    enum: [
      "active",
      "inactive"
    ],

    default: "active"
  },

  access_enabled: {
  type: Boolean,
  default: true
},

  created_at: {
    type: Date,
    default: Date.now
  }

  

});

module.exports = mongoose.model(
  "User",
  user_schema
);