const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/auth");

const adminonly =
  require("../middleware/admin");

const {
  getsettings,
  updatesettings,
} = require(
  "../controllers/customerformsettingcontroller"
);


// GET SETTINGS
router.get(
  "/",
  auth,
  getsettings
);


// UPDATE SETTINGS
router.put(
  "/update",
  auth,
  adminonly,
  updatesettings
);

module.exports = router;