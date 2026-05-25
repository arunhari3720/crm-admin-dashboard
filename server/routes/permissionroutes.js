const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  setPermissions,
  getMyPermissions,
  getPermissionByRole,
} = require("../controllers/permissioncontroller");

// TEMP SAFE VERSION (no adminonly for now)
router.post("/", auth, setPermissions);
router.get("/me", auth, getMyPermissions);
router.get("/:role", auth, getPermissionByRole);


module.exports = router;