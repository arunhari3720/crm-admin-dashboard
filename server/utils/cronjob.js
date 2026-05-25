const cron = require("node-cron");

const Notification = require("../models/notification_model");
const Event = require("../models/eventmodel");

let isRunning = false;

// ⏰ Runs every minute
cron.schedule("* * * * *", async () => {
  // Prevent overlapping jobs
  if (isRunning) {
    console.log("⚠️ Previous cron still running...");
    return;
  }

  isRunning = true;

  try {
    //console.log("⏱ Checking events...");

    const now = new Date();

    // Check events within next 5 minutes
    const nextFiveMinutes = new Date(now.getTime() + 5 * 60 * 1000);

    // Fetch only relevant events
    const events = await Event.find({
      datetime: {
        $gte: now,
        $lte: nextFiveMinutes,
      },
    }).lean();

    if (!events.length) {
      //console.log("📭 No upcoming events");

      isRunning = false;
      return;
    }

    for (const event of events) {
      try {
        // Skip invalid events
        if (!event.user_id) {
          console.log("❌ Missing user_id:", event._id);
          continue;
        }

        // Check existing notification
        const exists = await Notification.exists({
          reference_id: event._id,
          type: "meeting",
        });

        if (exists) {
          console.log("⚠️ Notification already exists");
          continue;
        }

        // Create notification
        await Notification.create({
          user_id: event.user_id,
          type: "meeting",
          title: event.title || "Event Reminder",
          message: "Your event is starting soon",
          reference_id: event._id,
          is_read: false,
        });

        console.log(`✅ Notification created for: ${event.title}`);

      } catch (eventErr) {
        console.log("❌ Event processing error:", eventErr.message);
      }
    }

  } catch (err) {
    console.log("❌ CRON ERROR:", err.message);

  } finally {
    isRunning = false;
  }
});