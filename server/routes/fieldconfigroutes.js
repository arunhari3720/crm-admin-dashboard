const express = require("express");
const router = express.Router();

const {
  setfield,
  getfields,
  deletefield,
  updatefield
} = require("../controllers/fieldconfigcontroller");

const auth = require("../middleware/auth");
const adminonly = require("../middleware/admin");

// 🔐 ADMIN ROUTES
router.post("/set", auth, adminonly, setfield);
router.put("/:id", auth, adminonly, updatefield);
router.delete("/:fieldname", auth, adminonly, deletefield);

// 👀 USER ROUTE (VIEW)
router.get("/all", auth, getfields);

module.exports = router;