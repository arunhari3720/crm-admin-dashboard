const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/upload"
);

// ✅ AUTH MIDDLEWARE
const auth = require(
  "../middleware/auth"
);

const {
  uploadfile,
  getfiles,
  deletefile,
} = require(
  "../controllers/filecontroller"
);

// ======================================================
// 🔥 UPLOAD FILE
// ======================================================

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadfile
);

// ======================================================
// 🔥 GET FILES
// ======================================================

router.get(
  "/all",
  auth,
  getfiles
);

// ======================================================
// 🔥 DELETE FILE
// ======================================================

router.delete(
  "/delete/:id",
  auth,
  deletefile
);

module.exports = router;