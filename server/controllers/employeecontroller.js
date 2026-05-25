const Employee = require("../models/employeemodel");
const Field = require("../models/fieldmodel");
const GenerateEmployeePdf = require("../utils/employeepdf");

// ================= CREATE =================
async function CreateEmployee(req, res) {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.json(emp);
  } catch (err) {
    console.log("Create Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// ================= GET =================
async function GetEmployees(req, res) {
  try {
    const data = await Employee.find();
    res.json(data);
  } catch (err) {
    console.log("Get Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// ================= UPDATE =================
async function UpdateEmployee(req, res) {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        dynamicfields: req.body.dynamicfields,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log("Update Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// ================= DELETE =================
async function DeleteEmployee(req, res) {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    console.log("Delete Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// ================= PDF =================
async function GenerateEmployeePdfController(req, res) {
  try {
    const employees = await Employee.find();
    const fields = await Field.find();

    // 👇 call util
    GenerateEmployeePdf(res, employees, fields);

  } catch (err) {
    console.log("PDF Error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  CreateEmployee,
  GetEmployees,
  UpdateEmployee,
  DeleteEmployee,
  GenerateEmployeePdfController,
};