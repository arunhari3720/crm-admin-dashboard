const express =
  require("express");

const router =
  express.Router();

const {
  get_users,
  toggle_user_access
} = require(
  "../controllers/usercontroller"
);

const auth =
  require(
    "../middleware/auth"
  );

const adminonly =
  require(
    "../middleware/admin"
  );


// =============================================
// GET USERS
// =============================================

router.get(
  "/list",
  auth,
  get_users
);


// =============================================
// TOGGLE ACCESS
// =============================================

router.put(
  "/toggle-access/:id",
  auth,
  adminonly,
  toggle_user_access
);

module.exports =
  router;