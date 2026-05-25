const Notification = require(
  "../models/notification_model"
);

// ======================================================
// 🔔 GET USER ID
// ======================================================

const getuserid = (req) => {

  return (
    req.user?._id ||
    req.user?.id ||
    req.user?.userid
  );
};

// ======================================================
// 🔔 CREATE NOTIFICATION
// ======================================================

const create_notification = async (
  req,
  res
) => {
  try {

    const notification =
      await Notification.create({
        ...req.body,

        user_id:
          getuserid(req),
      });

    res.json({
      success: true,
      data: notification
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// 🔔 CREATE SYSTEM NOTIFICATION
// ======================================================

const create_system_notification =
  async ({
    user_id,
    title,
    message,
  }) => {

    try {

      const notification =
        await Notification.create({

          user_id,

          title,

          message,

          is_read: false,
        });

      console.log(
        "SYSTEM NOTIFICATION CREATED:",
        notification
      );

    } catch (err) {

      console.log(
        "Notification Error:",
        err.message
      );
    }
  };

// ======================================================
// 🔔 GET ALL NOTIFICATIONS
// ======================================================

const get_notifications = async (
  req,
  res
) => {
  try {

    const data =
      await Notification.find({

        user_id:
          getuserid(req),

      }).sort({
        created_at: -1,
      });

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {

    console.log(
      "GET NOTIFICATION ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// 🔢 GET UNREAD COUNT
// ======================================================

const get_unread_count = async (
  req,
  res
) => {
  try {

    const count =
      await Notification.countDocuments({

        user_id:
          getuserid(req),

        is_read: false,
      });

    res.json({
      success: true,
      count
    });

  } catch (err) {

    console.log(
      "COUNT ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// ✅ MARK SINGLE AS READ
// ======================================================

const mark_as_read = async (
  req,
  res
) => {
  try {

    const { id } =
      req.params;

    const notification =
      await Notification.findOneAndUpdate(
        {
          _id: id,

          user_id:
            getuserid(req),
        },
        {
          is_read: true
        },
        {
          new: true
        }
      );

    if (!notification) {

      return res.status(404).json({
        success: false,
        message:
          "Notification not found"
      });
    }

    res.json({
      success: true,
      message:
        "Marked as read",

      data: notification
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// ✅ MARK ALL AS READ
// ======================================================

const mark_all_as_read = async (
  req,
  res
) => {
  try {

    await Notification.updateMany(
      {
        user_id:
          getuserid(req),

        is_read: false
      },
      {
        is_read: true
      }
    );

    res.json({
      success: true,
      message:
        "All notifications marked as read"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// 🗑 DELETE SINGLE NOTIFICATION
// ======================================================

const delete_notification = async (
  req,
  res
) => {
  try {

    const { id } =
      req.params;

    const deleted =
      await Notification.findOneAndDelete({
        _id: id,

        user_id:
          getuserid(req),
      });

    if (!deleted) {

      return res.status(404).json({
        success: false,
        message:
          "Notification not found"
      });
    }

    res.json({
      success: true,
      message:
        "Notification deleted"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// 🧹 CLEAR ALL NOTIFICATIONS
// ======================================================

const clear_all_notifications = async (
  req,
  res
) => {
  try {

    await Notification.deleteMany({
      user_id:
        getuserid(req),
    });

    res.json({
      success: true,
      message:
        "All notifications cleared"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  create_notification,
  create_system_notification,
  get_notifications,
  get_unread_count,
  mark_as_read,
  mark_all_as_read,
  delete_notification,
  clear_all_notifications
};