const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  uploadexcel,
  getexceldata,
} = require("../controllers/excelcontroller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadexcel);
router.get("/data", getexceldata);

module.exports = router;