// utils/birthday_service.js
const User = require("../models/user_model");

const get_today_birthdays_service = async () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  // Optimized query (better than filtering in JS)
  const users = await User.find({
    $expr: {
      $and: [
        { $eq: [{ $dayOfMonth: "$dob" }, day] },
        { $eq: [{ $month: "$dob" }, month] }
      ]
    }
  });

  return users;
};

module.exports = {
  get_today_birthdays_service
};