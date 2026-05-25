const express = require("express");
const router = express.Router();

const { createform } = require("../controllers/formcontroller");
const auth = require("../middleware/auth");

// 🔐 authenticated users can submit form
router.post("/create", auth, createform);

module.exports = router;