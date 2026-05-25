const express = require("express");
const router = express.Router();

const {
  CreateEmployee,
  GetEmployees,
  UpdateEmployee,
  DeleteEmployee,
  GenerateEmployeePdfController,
} = require("../controllers/employeecontroller");

// ================= ROUTES =================
router.post("/", CreateEmployee);
router.get("/", GetEmployees);
router.put("/:id", UpdateEmployee);
router.delete("/:id", DeleteEmployee);

// PDF ROUTE
router.get("/pdf", GenerateEmployeePdfController);

module.exports = router;