const express = require("express");

const router = express.Router();

// ✅ AUTH MIDDLEWARE
const auth = require(
  "../middleware/auth"
);

const {
  create_notification,
  get_notifications,
  get_unread_count,
  mark_as_read,
  mark_all_as_read,
  delete_notification,
  clear_all_notifications
} = require(
  "../controllers/notification_controller"
);

// ======================================================
// 🔔 CREATE NOTIFICATION
// ======================================================

router.post(
  "/create",
  auth,
  create_notification
);

// ======================================================
// 🔔 GET NOTIFICATIONS
// ======================================================

router.get(
  "/",
  auth,
  get_notifications
);

// ======================================================
// 🔢 GET UNREAD COUNT
// ======================================================

router.get(
  "/unread-count",
  auth,
  get_unread_count
);

// ======================================================
// ✅ MARK SINGLE READ
// ======================================================

router.put(
  "/read/:id",
  auth,
  mark_as_read
);

// ======================================================
// ✅ MARK ALL READ
// ======================================================

router.put(
  "/read-all",
  auth,
  mark_all_as_read
);

// ======================================================
// 🗑 DELETE SINGLE
// ======================================================

router.delete(
  "/:id",
  auth,
  delete_notification
);

// ======================================================
// 🧹 CLEAR ALL
// ======================================================

router.delete(
  "/",
  auth,
  clear_all_notifications
);

module.exports = router;