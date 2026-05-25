const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/auth"
  );

const {
  check_in,
  check_out,
  get_my_attendance,
  get_summary,
  get_all_attendance,
  get_live_attendance,
  get_today_attendance,
  get_user_attendance_history
} = require(
  "../controllers/attendancecontroller"
);
router.get("/", (req, res) => {
  res.send(
    "attendance route working"
  );
});
// ======================================================
// ROUTES
// ======================================================

router.post(
  "/check-in",
  auth,
  check_in
);

router.post(
  "/check-out",
  auth,
  check_out
);

router.get(
  "/my-attendance",
  auth,
  get_my_attendance
);

router.get(
  "/summary",
  auth,
  get_summary
);

router.get(
  "/all-attendance",
  auth,
  get_all_attendance
);

router.get(
  "/live-attendance",
  auth,
  get_live_attendance
);

router.get(
  "/today-attendance",
  auth,
  get_today_attendance
);
router.get(
  "/user/:id",
  auth,
  get_user_attendance_history
);
module.exports =
  router;