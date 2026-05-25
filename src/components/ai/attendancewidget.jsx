import {
  useCallback,
  useEffect,
} from "react";

import {
  GetUsers,
  getAttendanceSummary,
  getLiveAttendance,
  getTodayAttendance,
} from "../../services/api";

export default function AttendanceWidget({
  submittedmessage,
  setchatresponse,
}) {

  // ======================================================
  // FETCH ATTENDANCE
  // ======================================================

  const fetchattendance = useCallback(async () => {

    try {

      if (!submittedmessage) return;

      const lower =
        submittedmessage.toLowerCase();

      // ======================================================
      // LIVE ATTENDANCE
      // ======================================================

      if (
        lower.includes(
          "live attendance"
        ) ||

        lower.includes(
          "checked in"
        )
      ) {

        const [
          liveRes,
          usersRes,
          summaryRes,
        ] = await Promise.all([
          getLiveAttendance(),
          GetUsers(),
          getAttendanceSummary(),
        ]);

        // ======================================================
        // SAFE DATA
        // ======================================================

        const liveusers =
          liveRes?.data?.data ||
          liveRes?.data?.users ||
          [];

        const users =
          usersRes?.data?.users ||
          usersRes?.data?.data ||
          [];

        const summary =
          summaryRes?.data?.data ||
          {};

        // ======================================================
        // CURRENT USER
        // ======================================================

        const userid =
          localStorage.getItem(
            "userid"
          );

        const currentuser =
          liveusers.find((user) => {

            return (
              user.user_id ===
                userid ||

              user.user?._id ===
                userid ||

              user.userId ===
                userid
            );
          });

        // ======================================================
        // ACTIVE STATUS
        // ======================================================

        const yourattendance =
          currentuser

            ? "Your attendance is currently live ✅"

            : "You are currently checked out.";

        // ======================================================
        // LATE USERS
        // ======================================================

        const lateusers =
          liveusers.filter((user) => {

            const checkin =
              user.check_in ||

              user.checkIn ||

              user.sessions?.[0]
                ?.check_in ||

              user.sessions?.[0]
                ?.checkIn;

            if (!checkin)
              return false;

            const checkintime =
              new Date(checkin);

            const hours =
              checkintime.getHours();

            const minutes =
              checkintime.getMinutes();

            return (
              hours > 9 ||

              (
                hours === 9 &&
                minutes > 36
              )
            );
          });

        // ======================================================
        // RESPONSE
        // ======================================================

        setchatresponse(`
${yourattendance}

Today's attendance insights 📊

• Total Employees:
${users.length}

• Live Sessions:
${liveusers.length}

• Late Employees:
${lateusers.length}

• Average Hours:
${Number(
  summary.average_hours || 0
).toFixed(1)} hrs

${
  lateusers.length > 0

    ? `${lateusers.length} employees checked in after 9:36 AM.`

    : "No late employees today."
}
        `);
      }

      // ======================================================
      // TODAY ATTENDANCE
      // ======================================================

      else if (
        lower.includes(
          "today attendance"
        )
      ) {

        const res =
          await getTodayAttendance();

        const data =
          res?.data?.data || [];

        setchatresponse(`
Today's attendance fetched successfully ✅

• Present Employees:
${data.length}

• Attendance tracking is active.
        `);
      }

      // ======================================================
      // SUMMARY
      // ======================================================

      else if (
        lower.includes(
          "attendance summary"
        ) ||

        lower.includes(
          "summary"
        )
      ) {

        const [
          summaryRes,
          usersRes,
        ] = await Promise.all([
          getAttendanceSummary(),
          GetUsers(),
        ]);

        const summary =
          summaryRes?.data?.data ||
          {};

        const users =
          usersRes?.data?.users ||
          usersRes?.data?.data ||
          [];

        setchatresponse(`
Attendance Summary 📈

• Total Employees:
${users.length}

• Total Days:
${summary.total_days || 0}

• Total Hours:
${Number(
  summary.total_hours || 0
).toFixed(1)} hrs

• Average Hours:
${Number(
  summary.average_hours || 0
).toFixed(1)} hrs
        `);
      }

      // ======================================================
      // LATE USERS
      // ======================================================

      else if (
        lower.includes(
          "late employees"
        ) ||

        lower.includes(
          "late users"
        )
      ) {

        const res =
          await getLiveAttendance();

        const liveusers =
          res?.data?.data ||
          [];

        const lateusers =
          liveusers.filter((user) => {

            const checkin =
              user.check_in ||

              user.checkIn ||

              user.sessions?.[0]
                ?.check_in ||

              user.sessions?.[0]
                ?.checkIn;

            if (!checkin)
              return false;

            const checkintime =
              new Date(checkin);

            const hours =
              checkintime.getHours();

            const minutes =
              checkintime.getMinutes();

            return (
              hours > 9 ||

              (
                hours === 9 &&
                minutes > 36
              )
            );
          });

        setchatresponse(`
Late Attendance Report ⚠️

• Late Employees:
${lateusers.length}

${
  lateusers.length > 0

    ? "Some employees checked in after 9:36 AM."

    : "No late employees today."
}
        `);
      }

      // ======================================================
      // DEFAULT
      // ======================================================

      else {

        setchatresponse(`
Hello Harry 👋

I can help you with:

• Live Attendance
• Attendance Summary
• Today's Attendance
• Checked In Users
• Late Employees

Try asking:

"show live attendance"
        `);
      }

    } catch (err) {

      console.log(err);

      setchatresponse(`
Unable to fetch attendance data right now.
      `);
    }

  }, [
    submittedmessage,
    setchatresponse,
  ]);

  // ======================================================
  // EFFECT
  // ======================================================

  useEffect(() => {

    fetchattendance();

  }, [fetchattendance]);

  return null;
}