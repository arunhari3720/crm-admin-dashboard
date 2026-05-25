// routes/birthday_routes.js
const express = require("express");
const router = express.Router();

const {
  get_today_birthdays,
  run_birthday_job
} = require("../controllers/birthday_controller");

router.get("/today", get_today_birthdays);

// ✅ NEW (important)
router.post("/run", run_birthday_job);

module.exports = router;