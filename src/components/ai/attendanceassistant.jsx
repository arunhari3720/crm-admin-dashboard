import { useState } from "react";

import {
  getAllAttendance,
  getAttendanceSummary,
  getLiveAttendance,
} from "../../services/api";

import AttendanceChat from "./attendancechat";

export default function AttendanceAssistant({
  open,
  setopen,
}) {

  const [message, setmessage] =
    useState("");

  const [
    loading,
    setloading,
  ] = useState(false);

  const [
    messages,
    setmessages,
  ] = useState([
    {
      type: "ai",

      text: `Hello 👋

I can help you with attendance insights.

Try asking:

• Who is active today?
• Show today's attendance
• Show this month attendance
• Show late employees
• Attendance summary`,
    },
  ]);

  // ======================================================
  // DETECT INTENT
  // ======================================================

  const detectintent = (text) => {

    const lower =
      text.toLowerCase();

    // TODAY

    if (

      lower.includes("today") ||

      lower.includes("active") ||

      lower.includes("checked in") ||

      lower.includes("present")

    ) {
      return "today";
    }

    // MONTH

    if (

      lower.includes("month") ||

      lower.includes("all attendance") ||

      lower.includes("history")

    ) {
      return "all";
    }

    // LATE

    if (

      lower.includes("late") ||

      lower.includes("after 9")

    ) {
      return "late";
    }

    // SUMMARY

    if (

      lower.includes("summary") ||

      lower.includes("analytics") ||

      lower.includes("report")

    ) {
      return "summary";
    }

    return "unknown";
  };

  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendmessage = async () => {

    if (!message.trim())
      return;

    const query = message;

    // USER MESSAGE

    setmessages((prev) => [
      ...prev,
      {
        type: "user",
        text: query,
      },
    ]);

    setmessage("");

    try {

      setloading(true);

      const intent =
        detectintent(query);
// ======================================================
// TODAY ATTENDANCE
// ======================================================

if (intent === "today") {

  const res =
    await getLiveAttendance();

  const attendance =
    res?.data?.data || [];

  // ======================================================
  // ATTENDANCE DETAILS
  // ======================================================

  const attendanceinfo =
    attendance.map((item) => {

      const sessions =
        item.sessions || [];

      const lastsession =
        sessions[
          sessions.length - 1
        ];

      // USER NAME

      const username =
        item.user?.name ||
        "Unknown User";

      // CHECK IN

      let checkintime =
        "No Check In";

      if (
        lastsession?.check_in
      ) {

        checkintime =
          new Date(
            lastsession.check_in
          ).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );
      }

      // CHECK OUT

      let checkouttime =
        "Not Checked Out";

      if (
        lastsession?.check_out
      ) {

        checkouttime =
          new Date(
            lastsession.check_out
          ).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );
      }

      // STATUS

      const status =
        lastsession?.check_out

          ? "Checked Out"

          : "Still Checked In ✅";

      // TOTAL SESSIONS

      const totalsessions =
        sessions.length;

      // TOTAL HOURS

      let totalhours = 0;

      sessions.forEach(
        (session) => {

          if (
            session.check_in &&
            session.check_out
          ) {

            const checkin =
              new Date(
                session.check_in
              );

            const checkout =
              new Date(
                session.check_out
              );

            totalhours +=
              (
                checkout -
                checkin
              ) /
              (1000 * 60 * 60);
          }
        }
      );

      return `
• ${username}

  Check In:
  ${checkintime}

  Check Out:
  ${checkouttime}

  Sessions:
  ${totalsessions}

  Working Hours:
  ${totalhours.toFixed(1)} hrs

  Status:
  ${status}
      `;
    }).join("\n");

  // ======================================================
  // RESPONSE
  // ======================================================

  setmessages((prev) => [
    ...prev,
    {
      type: "ai",

      text: `
Today's Attendance 📋

${attendanceinfo}

Total Employees:
${attendance.length}
      `,

      showbutton: true,
    },
  ]);
}

      // ======================================================
      // ALL ATTENDANCE
      // ======================================================

      else if (
        intent === "all"
      ) {

        const res =
          await getAllAttendance();

        const attendance =
          res?.data?.data || [];

        // USER ATTENDANCE LIST

        const attendancehistory =
          attendance.map((item) => {

            const sessions =
              item.sessions || [];

            return `• ${
              item.user?.name ||
              "Unknown User"
            } — ${
              sessions.length
            } sessions`;
          }).join("\n");

        setmessages((prev) => [
          ...prev,
          {
            type: "ai",

            text: `
This Month Attendance 📅

${attendancehistory}

Total Employees:
${attendance.length}
            `,

            showbutton: true,
          },
        ]);
      }

      // ======================================================
      // LATE USERS
      // ======================================================

      else if (
        intent === "late"
      ) {

        const res =
          await getLiveAttendance();

        const attendance =
          res?.data?.data || [];

        const lateusers =
          attendance.filter((item) => {

            const sessions =
              item.sessions || [];

            const lastsession =
              sessions[
                sessions.length - 1
              ];

            if (
              !lastsession?.check_in
            ) {
              return false;
            }

            const checkin =
              new Date(
                lastsession.check_in
              );

            const hours =
              checkin.getHours();

            const minutes =
              checkin.getMinutes();

            return (

              hours > 9 ||

              (
                hours === 9 &&
                minutes > 36
              )

            );
          });

        const latelist =
          lateusers.map((item) => {

            const sessions =
              item.sessions || [];

            const lastsession =
              sessions[
                sessions.length - 1
              ];

            const checkin =
              new Date(
                lastsession.check_in
              );

            const time =
              checkin.toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

            return `• ${
              item.user?.name
            } — ${time}`;
          }).join("\n");

        setmessages((prev) => [
          ...prev,
          {
            type: "ai",

            text: `
Late Employees Today ⚠️

${latelist || "No late employees today."}

Total Late Employees:
${lateusers.length}
            `,

            showbutton: true,
          },
        ]);
      }

      // ======================================================
      // SUMMARY
      // ======================================================

      else if (
        intent === "summary"
      ) {

        const res =
          await getAttendanceSummary();

        const summary =
          res?.data?.data || {};

        setmessages((prev) => [
          ...prev,
          {
            type: "ai",

            text: `
Attendance Summary 📈

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
            `,

            showbutton: true,
          },
        ]);
      }

      // ======================================================
      // UNKNOWN
      // ======================================================

      else {

        setmessages((prev) => [
          ...prev,
          {
            type: "ai",

            text: `
I couldn't understand that request.

Try asking:

• Show today's attendance
• Show this month attendance
• Show late employees
• Attendance summary
            `,
          },
        ]);
      }

    } catch (err) {

      console.log(err);

      setmessages((prev) => [
        ...prev,
        {
          type: "ai",

          text: `
Unable to fetch attendance data right now.
Please try again later.
          `,
        },
      ]);
    }

    finally {

      setloading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
        backdrop-blur-md
        p-2
        sm:p-4
      "
    >
      {/* MODAL */}

      <div
        className="
          flex
          h-[95vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            px-4
            py-4
            sm:px-8
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-black
                text-slate-800
              "
            >
              Attendance AI
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Smart attendance assistant
            </p>
          </div>

          <button
            onClick={() =>
              setopen(false)
            }
            className="
              rounded-2xl
              bg-slate-100
              px-4
              py-2
              text-sm
              font-medium
            "
          >
            Close
          </button>
        </div>

        {/* CHAT */}

        <div
          className="
            flex-1
            overflow-hidden
            p-4
            sm:p-6
          "
        >
          <AttendanceChat
            messages={messages}
            loading={loading}
          />
        </div>

        {/* INPUT */}

        <div
          className="
            border-t
            border-slate-100
            p-4
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
            "
          >
            <input
              type="text"
              value={message}
              onChange={(e) =>
                setmessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {
                  sendmessage();
                }
              }}
              placeholder="Ask attendance AI..."
              className="
                flex-1
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-5
                py-4
                text-sm
                outline-none
              "
            />

            <button
              onClick={sendmessage}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-violet-500
                px-8
                py-4
                text-sm
                font-semibold
                text-white
              "
            >
              {loading
                ? "Thinking..."
                : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}