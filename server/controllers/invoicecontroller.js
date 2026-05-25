const Invoice = require("../models/invoicemodel");
const generatepdf = require("../utils/pdfgenerator"); // ✅ updated import

// create invoice
const createinvoice = async (req, res) => {
  try {
    const {
      employeename,
      employeeid,
      designation,
      basicsalary,
      hra,
      allowances,
      deductions,
      month,
      year
    } = req.body;

    // 🔐 validation
    if (
      !employeename ||
      !employeeid ||
      !designation ||
      basicsalary === undefined ||
      hra === undefined ||
      allowances === undefined ||
      deductions === undefined ||
      !month ||
      !year
    ) {
      return res.status(400).json({
        success: false,
        message: "please fill all required fields"
      });
    }

    // 🔥 ORIGINAL LOGIC
    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      success: true,
      data: invoice
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// get pdf
const getinvoicepdf = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔐 validate id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "invoice id is required"
      });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "invoice not found"
      });
    }

    // ✅ FIXED: correct function + correct params
    await generatepdf(res, invoice);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  createinvoice,
  getinvoicepdf
};