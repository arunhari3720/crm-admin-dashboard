const mongoose = require("mongoose");

const invoiceschema = new mongoose.Schema({
  employeename: {
    type: String,
    required: [true, "employee name is required"]
  },
  employeeid: {
    type: String,
    required: [true, "employee id is required"]
  },
  designation: {
    type: String,
    required: [true, "designation is required"]
  },

  basicsalary: {
    type: Number,
    required: true,
    min: 0
  },
  hra: {
    type: Number,
    required: true,
    min: 0
  },
  allowances: {
    type: Number,
    required: true,
    min: 0
  },
  deductions: {
    type: Number,
    required: true,
    min: 0
  },

  netsalary: {
    type: Number,
    required: true
  },

  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("invoice", invoiceschema);