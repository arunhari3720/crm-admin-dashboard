const express = require("express");
const router = express.Router();

const {
  createModule,
  getModules,
  updateModule,
} = require("../controllers/modulecontroller");

const auth = require("../middleware/auth");
const adminonly = require("../middleware/admin");

// 🔐 ADMIN
router.post("/", auth, adminonly, createModule);

// 👀 VIEW
router.get("/", auth, getModules);

router.put("/:id", auth, adminonly, updateModule);
module.exports = router;