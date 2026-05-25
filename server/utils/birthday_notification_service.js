// utils/birthday_notification_service.js

const User = require("../models/user_model"); // ✅ FIXED
const Notification = require("../models/notification_model");

const {
  get_today_birthdays_service
} = require("./birthday_service");

const create_birthday_notifications = async () => {
  const users = await get_today_birthdays_service();

  const today_start = new Date();
  today_start.setHours(0, 0, 0, 0);

  // 🔥 fetch admin ONCE
  const admin = await User.findOne({ role: "admin" });

  if (!admin) {
    throw new Error("Admin user not found");
  }

  for (let user of users) {

    const exists = await Notification.findOne({
      reference_id: user._id,
      type: "birthday",
      created_at: { $gte: today_start }
    });

    if (!exists) {
      await Notification.create({
        user_id: admin._id,
        type: "birthday",
        title: "Birthday Reminder",
        message: `🎉 Today is ${user.name}'s birthday`,
        reference_id: user._id
      });
    }
  }

  return users.length;
};

module.exports = {
  create_birthday_notifications
};