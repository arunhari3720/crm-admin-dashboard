const mongoose =
  require("mongoose");

// ======================================================
// SESSION SCHEMA
// ======================================================

const session_schema =
  new mongoose.Schema({
    check_in: {
      type: Date,
    },

    check_out: {
      type: Date,
      default: null,
    },

    total_minutes: {
      type: Number,
      default: 0,
    },
  });

// ======================================================
// ATTENDANCE SCHEMA
// ======================================================

const attendance_schema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      date: {
        type: String,
      },

      sessions: [
        session_schema,
      ],

      total_hours: {
        type: Number,
        default: 0,
      },

      total_minutes: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Attendance",
    attendance_schema
  );