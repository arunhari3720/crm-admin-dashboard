// controllers/birthday_controller.js
const {
  get_today_birthdays_service
} = require("../utils/birthday_service");

const {
  create_birthday_notifications
} = require("../utils/birthday_notification_service");

// 🎂 Get today's birthdays
const get_today_birthdays = async (req, res) => {
  try {
    const users = await get_today_birthdays_service();

    res.json({
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔔 Trigger birthday notifications manually
const run_birthday_job = async (req, res) => {
  try {
    const count = await create_birthday_notifications();

    res.json({
      message: "Birthday notifications processed",
      created_for: count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  get_today_birthdays,
  run_birthday_job
};