const express = require("express");
const router = express.Router();

const {
  createinvoice,
  getinvoicepdf
} = require("../controllers/invoicecontroller");

// create invoice
router.post("/", createinvoice);

// download invoice pdf
router.get("/:id/pdf", getinvoicepdf);

module.exports = router;