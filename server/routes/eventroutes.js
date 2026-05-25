const express = require("express");
const router = express.Router();

const {
  createevent,
  getevents,
  updateevent,
  deleteevent
} = require("../controllers/eventcontroller");

/* ✅ FIXED ROUTES */
router.post("/", createevent);
router.get("/", getevents);
router.put("/:id", updateevent);
router.delete("/:id", deleteevent);

module.exports = router;