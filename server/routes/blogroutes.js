const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");

const {
  createblog,
  getblogs,
  getblogbyid,
  updateblog,
  deleteblog,
} = require("../controllers/blogcontroller");

// ✅ ONLY ONE POST ROUTE (WITH MULTER)
router.post("/", upload.single("image"), createblog);

router.get("/", getblogs);
router.get("/:id", getblogbyid);

// 🔥 also update PUT to support image update
router.put("/:id", upload.single("image"), updateblog);

router.delete("/:id", deleteblog);

module.exports = router;