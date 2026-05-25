const express = require("express");
const router = express.Router();

const {
  createcustomer,
  getcustomers,
  updatecustomer,
  deletecustomer
} = require("../controllers/customercontroller");

router.post("/", createcustomer);
router.get("/", getcustomers);
router.put("/:id", updatecustomer);
router.delete("/:id", deletecustomer);

module.exports = router;