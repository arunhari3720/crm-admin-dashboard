const Attendance =
  require(
    "../models/attendancemodel"
  );

const User =
  require(
    "../models/user_model"
  );


// ======================================================
// GET USER ID
// ======================================================

const get_user_id = (
  req
) => {

  return (
    req.user?.userId ||
    req.user?.id ||
    req.user?._id
  );
};


// ======================================================
// CHECK IN
// ======================================================

const check_in =
  async (req, res) => {

    try {

      const user_id =
        get_user_id(req);

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      // ======================================================
      // FIND TODAY ATTENDANCE
      // ======================================================

      let attendance =
        await Attendance.findOne({

          user:
            user_id,

          date:
            today
        });


      // ======================================================
      // CREATE NEW DAY
      // ======================================================

      if (!attendance) {

        attendance =
          await Attendance.create({

            user:
              user_id,

            date:
              today,

            sessions: [],

            total_minutes: 0,

            total_hours: 0
          });
      }


      // ======================================================
      // CHECK OPEN SESSION
      // ======================================================

      const open_session =
        attendance.sessions.find(
          (session) =>
            !session.check_out
        );

      if (open_session) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Already checked in"
          });
      }


      // ======================================================
      // CREATE NEW SESSION
      // ======================================================

      attendance.sessions.push({

        check_in:
          new Date()
      });

      await attendance.save();


      // ======================================================
      // RESPONSE
      // ======================================================

      res.json({

        success: true,

        message:
          "Checked in successfully",

        data:
          attendance
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };


// ======================================================
// CHECK OUT
// ======================================================

const check_out =
  async (req, res) => {

    try {

      const user_id =
        get_user_id(req);

      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      // ======================================================
      // FIND ATTENDANCE
      // ======================================================

      const attendance =
        await Attendance.findOne({

          user:
            user_id,

          date:
            today
        });

      if (!attendance) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Attendance not found"
          });
      }


      // ======================================================
      // FIND ACTIVE SESSION
      // ======================================================

      const open_session =
        attendance.sessions.find(
          (session) =>
            !session.check_out
        );

      if (!open_session) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Already checked out"
          });
      }


      // ======================================================
      // SAVE CHECK OUT
      // ======================================================

      open_session.check_out =
        new Date();


      // ======================================================
      // SESSION TIME
      // ======================================================

      const diff =
        open_session.check_out -
        open_session.check_in;

      const total_minutes =
        Math.floor(
          diff / (1000 * 60)
        );

      open_session.total_minutes =
        total_minutes;


      // ======================================================
      // TOTAL DAY CALCULATION
      // ======================================================

      const all_minutes =
        attendance.sessions.reduce(

          (acc, session) =>

            acc +
            (
              session.total_minutes ||
              0
            ),

          0
        );

      attendance.total_minutes =
        all_minutes;

      attendance.total_hours =
        (
          all_minutes / 60
        ).toFixed(2);

      await attendance.save();


      // ======================================================
      // RESPONSE
      // ======================================================

      res.json({

        success: true,

        message:
          "Checked out successfully",

        data:
          attendance
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };


// ======================================================
// GET MY ATTENDANCE
// ======================================================

const get_my_attendance =
  async (req, res) => {

    try {

      const user_id =
        get_user_id(req);

      const attendance =
        await Attendance.find({

          user:
            user_id

        }).sort({

          createdAt: -1
        });

      res.json({

        success: true,

        count:
          attendance.length,

        data:
          attendance
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };


// ======================================================
// GET SUMMARY
// ======================================================

const get_summary =
  async (req, res) => {

    try {

      const user_id =
        get_user_id(req);

      const attendance =
        await Attendance.find({

          user:
            user_id
        });


      // ======================================================
      // TOTAL DAYS
      // ======================================================

      const total_days =
        attendance.length;


      // ======================================================
      // TOTAL HOURS
      // ======================================================

      const total_hours =
        attendance.reduce(

          (acc, item) =>

            acc +
            Number(
              item.total_hours || 0
            ),

          0
        );


      // ======================================================
      // AVERAGE HOURS
      // ======================================================

      const average_hours =
        total_days > 0

          ? (
              total_hours /
              total_days
            ).toFixed(2)

          : 0;


      // ======================================================
      // RESPONSE
      // ======================================================

      res.json({

        success: true,

        data: {

          total_days,

          total_hours:
            total_hours.toFixed(2),

          average_hours
        }
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };


// ======================================================
// GET ALL ATTENDANCE
// ADMIN + HR
// ======================================================

const get_all_attendance =
  async (req, res) => {

    try {

      let user_filter = {};

      // ======================================================
      // HR SHOULD NOT SEE ADMIN
      // ======================================================

      if (
        req.user.role === "hr"
      ) {

        const users =
          await User.find({

            role: {
              $ne: "admin"
            }

          }).select("_id");

        user_filter = {

          user: {
            $in:
              users.map(
                (user) =>
                  user._id
              )
          }
        };
      }


      // ======================================================
      // GET ATTENDANCE
      // ======================================================

      const attendance =
        await Attendance.find(
          user_filter
        )

        .populate(

          "user",

          `
            name
            email
            role
            department
            designation
          `
        )

        .sort({

          createdAt: -1
        });


      // ======================================================
      // RESPONSE
      // ======================================================

      res.json({

        success: true,

        count:
          attendance.length,

        data:
          attendance
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };


// ======================================================
// GET LIVE ATTENDANCE
// ======================================================

const get_live_attendance =
  async (req, res) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      let user_filter = {};

      // ======================================================
      // HR FILTER
      // ======================================================

      if (
        req.user.role === "hr"
      ) {

        const users =
          await User.find({

            role: {
              $ne: "admin"
            }

          }).select("_id");

        user_filter = {

          user: {
            $in:
              users.map(
                (user) =>
                  user._id
              )
          }
        };
      }


      // ======================================================
      // TODAY ATTENDANCE
      // ======================================================

      const attendance =
        await Attendance.find({

          date:
            today,

          ...user_filter
        })

        .populate(

          "user",

          `
            name
            role
            department
            designation
          `
        );


      // ======================================================
      // ACTIVE USERS
      // ======================================================

      const live_users =
        attendance.filter(
          (item) =>

            item.sessions.some(
              (session) =>
                !session.check_out
            )
        );


      // ======================================================
      // RESPONSE
      // ======================================================

      res.json({

        success: true,

        count:
          live_users.length,

        data:
          live_users
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };


// ======================================================
// GET TODAY ATTENDANCE
// ======================================================

const get_today_attendance =
  async (req, res) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      let user_filter = {};

      // ======================================================
      // HR FILTER
      // ======================================================

      if (
        req.user.role === "hr"
      ) {

        const users =
          await User.find({

            role: {
              $ne: "admin"
            }

          }).select("_id");

        user_filter = {

          user: {
            $in:
              users.map(
                (user) =>
                  user._id
              )
          }
        };
      }


      // ======================================================
      // GET TODAY DATA
      // ======================================================

      const attendance =
        await Attendance.find({

          date:
            today,

          ...user_filter
        })

        .populate(

          "user",

          `
            name
            role
            department
            designation
          `
        )

        .sort({

          createdAt: -1
        });


      // ======================================================
      // RESPONSE
      // ======================================================

      res.json({

        success: true,

        count:
          attendance.length,

        data:
          attendance
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };
// ======================================================
// GET USER ATTENDANCE HISTORY
// ======================================================

const get_user_attendance_history =
  async (req, res) => {

    try {

      const user_id =
        req.params.id;

      const attendance =
        await Attendance.find({

          user:
            user_id

        })

        .populate(
          "user",
          `
            name
            email
            role
            department
            designation
          `
        )

        .sort({

          createdAt: -1
        });

      res.json({

        success: true,

        count:
          attendance.length,

        data:
          attendance
      });

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };

// ======================================================
// EXPORTS
// ======================================================

module.exports = {

  check_in,

  check_out,

  get_my_attendance,

  get_summary,

  get_all_attendance,

  get_live_attendance,

  get_today_attendance,

  get_user_attendance_history
};