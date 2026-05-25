const cron = require("node-cron");

const {
  create_birthday_notifications,
} = require("../utils/birthday_notification_service");

// Prevent overlapping cron runs
let isRunning = false;

// Runs every day at 12:00 AM
cron.schedule("0 0 0 * * *", async () => {
  // Skip if previous job still running
  if (isRunning) {
    console.log("⚠️ Previous birthday cron still running...");
    return;
  }

  isRunning = true;

  console.log("🎂 Birthday cron started");

  console.time("birthday-job");

  try {
    const count = await create_birthday_notifications();

    console.log(`✅ Notifications created for ${count} users`);
  } catch (err) {
    console.error("❌ Birthday cron error:", err);
  } finally {
    console.timeEnd("birthday-job");

    isRunning = false;

    console.log("🎂 Birthday cron completed");
  }
});