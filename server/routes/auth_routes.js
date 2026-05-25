const express = require("express");

const router = express.Router();

const {
  register_user,
  login_user
} = require("../controllers/auth_controller");

const auth = require("../middleware/auth");


// =============================================
// PUBLIC ROUTES
// =============================================

// first admin creation
router.post(
  "/register",
  register_user
);

// login
router.post(
  "/login",
  login_user
);


// =============================================
// PROTECTED ROUTES
// =============================================

// create users
router.post(
  "/create",
  auth,
  register_user
);


module.exports = router;