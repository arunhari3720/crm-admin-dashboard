import { useEffect, useState } from "react";

import {
  Clock3,
  CalendarDays,
  TimerReset,
  Activity,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import axios from "../services/api";

import LiveClock from "../components/liveclock";

export default function Attendance() {
  // ======================================================
  // STATES
  // ======================================================

  const [summary, setSummary] = useState({});

  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);

  const [liveTime, setLiveTime] = useState("00:00:00");

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);

  // ======================================================
  // FETCH SUMMARY
  // ======================================================

  const fetchSummary = async () => {
    try {
      const res = await axios.get("/attendance/summary");

      setSummary(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ======================================================
  // FETCH ATTENDANCE
  // ======================================================

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("/attendance/my-attendance");

      setAttendance(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {
    fetchSummary();

    fetchAttendance();
  }, []);

  // ======================================================
  // AUTO REFRESH
  // ======================================================

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSummary();

      fetchAttendance();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ======================================================
  // LIVE TIMER
  // ======================================================

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().split("T")[0];

      const todayAttendance = attendance.find((item) => item.date === today);

      if (!todayAttendance) {
        setLiveTime("00:00:00");

        setIsCheckedIn(false);

        return;
      }

      let totalSeconds = 0;

      let activeSession = false;

      todayAttendance.sessions?.forEach((session) => {
        const checkIn = new Date(session.check_in);

        // ACTIVE SESSION

        if (!session.check_out) {
          activeSession = true;

          totalSeconds += Math.floor((new Date() - checkIn) / 1000);
        }

        // CLOSED SESSION
        else {
          const checkOut = new Date(session.check_out);

          totalSeconds += Math.floor((checkOut - checkIn) / 1000);
        }
      });

      setIsCheckedIn(activeSession);

      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0",
      );

      const seconds = String(totalSeconds % 60).padStart(2, "0");

      setLiveTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [attendance]);

  // ======================================================
  // FORMAT TIME
  // ======================================================

  const formatTime = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ======================================================
  // FORMAT DAY
  // ======================================================

  const formatDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-blue-50
        p-4
        md:p-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          space-y-6
        "
      >
        {/* ====================================================== */}
        {/* LIVE CLOCK */}
        {/* ====================================================== */}

        <LiveClock />

        {/* ====================================================== */}
        {/* LIVE TRACKER + STATUS */}
        {/* ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-4
            gap-5
          "
        >
          {/* LIVE TRACKER */}

          <div
            className="
              lg:col-span-3
              bg-white
              rounded-3xl
              border
              border-slate-100
              shadow-sm
              relative
              overflow-hidden
            "
          >
            <div
              className={`
                absolute
                -top-10
                -right-10
                w-40
                h-40
                rounded-full
                blur-3xl
                opacity-40

                ${isCheckedIn ? "bg-emerald-100" : "bg-red-100"}
              `}
            />

            <div
              className="
                relative
                z-10
                flex
                items-center
                justify-between
                p-6
                md:p-8
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                >
                  <span
                    className={`
                      w-5
                      h-px

                      ${isCheckedIn ? "bg-emerald-600" : "bg-red-500"}
                    `}
                  />

                  <p
                    className={`
                      text-[11px]
                      uppercase
                      tracking-[0.2em]
                      font-semibold

                      ${isCheckedIn ? "text-emerald-600" : "text-red-500"}
                    `}
                  >
                    {isCheckedIn ? "Live Tracking" : "Checked Out"}
                  </p>
                </div>

                {/* TIMER */}

                <h1
                  className="
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    font-bold
                    font-mono
                    text-slate-900
                    tracking-tight
                  "
                >
                  {liveTime}
                </h1>

                {/* STATUS */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-4
                  "
                >
                  <span
                    className={`
                      w-2
                      h-2
                      rounded-full
                      animate-pulse

                      ${isCheckedIn ? "bg-emerald-500" : "bg-red-500"}
                    `}
                  />

                  <span
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    {isCheckedIn
                      ? "Attendance tracking active"
                      : "Session ended for today"}
                  </span>
                </div>
              </div>

              {/* ICON */}

              <div
                className={`
                  hidden
                  md:flex
                  w-16
                  h-16
                  rounded-2xl
                  items-center
                  justify-center

                  ${
                    isCheckedIn
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }
                `}
              >
                {isCheckedIn ? <Activity size={30} /> : <XCircle size={30} />}
              </div>
            </div>
          </div>

          {/* TODAY STATUS */}

          <div
            className={`
              rounded-3xl
              p-6
              text-white
              shadow-lg
              flex
              flex-col
              justify-between

              ${
                isCheckedIn
                  ? `
                    bg-gradient-to-br
                    from-emerald-500
                    to-teal-500
                  `
                  : `
                    bg-gradient-to-br
                    from-red-500
                    to-rose-500
                  `
              }
            `}
          >
            <div>
              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  opacity-80
                  mb-3
                "
              >
                Today Status
              </p>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {isCheckedIn ? "Checked In" : "Checked Out"}
              </h2>

              <p
                className="
                  text-sm
                  opacity-90
                  mt-2
                  leading-relaxed
                "
              >
                {isCheckedIn
                  ? `
                      Your attendance session
                      is currently active.
                    `
                  : `
                      Your work session has
                      ended successfully.
                    `}
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                mt-6
              "
            >
              {isCheckedIn ? <CheckCircle2 size={18} /> : <XCircle size={18} />}

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                {isCheckedIn ? "Live Session" : "Session Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* SUMMARY CARDS */}
        {/* ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >
          {/* TOTAL DAYS */}

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-100
              p-6
              shadow-sm
            "
          >
            <div
              className="
                flex
                justify-between
                items-start
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                    mb-3
                  "
                >
                  Total Days
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-900
                  "
                >
                  {summary.total_days || 0}
                </h2>
              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-blue-50
                  text-blue-700
                  flex
                  items-center
                  justify-center
                "
              >
                <CalendarDays size={24} />
              </div>
            </div>
          </div>

          {/* TOTAL HOURS */}

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-100
              p-6
              shadow-sm
            "
          >
            <div
              className="
                flex
                justify-between
                items-start
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                    mb-3
                  "
                >
                  Total Hours
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-900
                  "
                >
                  {Number(summary.total_hours || 0).toFixed(1)}

                  <span
                    className="
                      text-base
                      text-slate-400
                      ml-1
                    "
                  >
                    hrs
                  </span>
                </h2>
              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-emerald-50
                  text-emerald-700
                  flex
                  items-center
                  justify-center
                "
              >
                <Clock3 size={24} />
              </div>
            </div>
          </div>

          {/* AVG HOURS */}

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-100
              p-6
              shadow-sm
            "
          >
            <div
              className="
                flex
                justify-between
                items-start
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                    mb-3
                  "
                >
                  Average Hours
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-900
                  "
                >
                  {Number(summary.average_hours || 0).toFixed(1)}

                  <span
                    className="
                      text-base
                      text-slate-400
                      ml-1
                    "
                  >
                    hrs
                  </span>
                </h2>
              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-violet-50
                  text-violet-700
                  flex
                  items-center
                  justify-center
                "
              >
                <TimerReset size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* ATTENDANCE TABLE */}
        {/* ====================================================== */}

       <div
  className="
    bg-white
    rounded-3xl
    border
    border-slate-100
    shadow-sm
    overflow-hidden
  "
>

  {/* HEADER */}

  <div
    className="
      px-4
      sm:px-6
      lg:px-8
      py-6
      border-b
      border-slate-100
    "
  >

    <h2
      className="
        text-xl
        sm:text-2xl
        font-bold
        text-slate-900
      "
    >
      Attendance History
    </h2>

    <p
      className="
        text-sm
        text-slate-400
        mt-1
      "
    >
      Daily grouped attendance sessions
    </p>

  </div>


  {/* ====================================================== */}
  {/* DESKTOP TABLE */}
  {/* ====================================================== */}

  <div
    className="
      hidden
      lg:block
      overflow-x-auto
    "
  >

    <table
      className="
        w-full
      "
    >

      <thead
        className="
          bg-slate-50
          border-b
          border-slate-100
        "
      >

        <tr>

          <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Date
          </th>

          <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Sessions
          </th>

          <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Total Time
          </th>

          <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Status
          </th>

          <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Action
          </th>

        </tr>

      </thead>


      <tbody>

        {loading ? (

          <tr>

            <td
              colSpan="5"
              className="
                text-center
                py-20
                text-slate-400
              "
            >
              Loading attendance...
            </td>

          </tr>

        ) : attendance.length === 0 ? (

          <tr>

            <td
              colSpan="5"
              className="
                text-center
                py-20
                text-slate-400
              "
            >
              No attendance records found
            </td>

          </tr>

        ) : (

          attendance.map(
            (item) => {

              const activeSession =
                item.sessions?.some(
                  (session) =>
                    !session.check_out
                );

              return (

                <>
                  {/* MAIN ROW */}

                  <tr
                    key={item._id}
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                      transition-all
                    "
                  >

                    {/* DATE */}

                    <td
                      className="
                        px-8
                        py-6
                      "
                    >

                      <div>

                        <h3
                          className="
                            font-semibold
                            text-slate-800
                          "
                        >
                          {item.date}
                        </h3>

                        <p
                          className="
                            text-sm
                            text-slate-400
                            mt-1
                          "
                        >
                          {
                            formatDay(
                              item.date
                            )
                          }
                        </p>

                      </div>

                    </td>


                    {/* SESSIONS */}

                    <td
                      className="
                        px-8
                        py-6
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          gap-2
                        "
                      >

                        {
                          item.sessions
                            ?.slice(0, 1)
                            .map(
                              (
                                session,
                                index
                              ) => (

                                <div
                                  key={index}
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                    flex-wrap
                                  "
                                >

                                  <span
                                    className="
                                      px-3
                                      py-1.5
                                      rounded-xl
                                      bg-blue-50
                                      text-blue-700
                                      text-xs
                                      font-medium
                                    "
                                  >
                                    IN
                                    {" "}
                                    {formatTime(
                                      session.check_in
                                    )}
                                  </span>

                                  <span
                                    className="
                                      text-slate-400
                                    "
                                  >
                                    →
                                  </span>

                                  <span
                                    className={`
                                      px-3
                                      py-1.5
                                      rounded-xl
                                      text-xs
                                      font-medium

                                      ${
                                        session.check_out

                                          ? `
                                            bg-red-50
                                            text-red-600
                                          `

                                          : `
                                            bg-emerald-50
                                            text-emerald-700
                                          `
                                      }
                                    `}
                                  >
                                    {
                                      session.check_out

                                        ? `
                                          OUT
                                          ${formatTime(
                                            session.check_out
                                          )}
                                        `

                                        : "ACTIVE"
                                    }
                                  </span>

                                </div>
                              )
                            )
                        }

                        {
                          item.sessions
                            ?.length > 1 && (

                            <p
                              className="
                                text-xs
                                text-slate-400
                              "
                            >
                              +
                              {
                                item.sessions
                                  .length - 1
                              }
                              {" "}
                              more sessions
                            </p>
                          )
                        }

                      </div>

                    </td>


                    {/* TOTAL TIME */}

                    <td
                      className="
                        px-8
                        py-6
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-bold
                          text-slate-800
                        "
                      >
                        {
                          item.total_hours || 0
                        }
                        h
                        {" "}
                        {
                          item.total_minutes || 0
                        }
                        m
                      </h3>

                    </td>


                    {/* STATUS */}

                    <td
                      className="
                        px-8
                        py-6
                      "
                    >

                      {
                        activeSession

                          ? (
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-emerald-100
                                text-emerald-700
                                text-xs
                                font-semibold
                              "
                            >
                              <span
                                className="
                                  w-2
                                  h-2
                                  rounded-full
                                  bg-emerald-500
                                  animate-pulse
                                "
                              />

                              Active
                            </span>
                          )

                          : (
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-red-100
                                text-red-600
                                text-xs
                                font-semibold
                              "
                            >
                              Checked Out
                            </span>
                          )
                      }

                    </td>


                    {/* ACTION */}

                    <td
                      className="
                        px-8
                        py-6
                      "
                    >

                      <button
                        onClick={() =>
                          setExpandedRow(
                            expandedRow === item._id
                              ? null
                              : item._id
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-slate-100
                          hover:bg-slate-200
                          text-sm
                          font-medium
                          transition-all
                        "
                      >

                        {
                          expandedRow === item._id

                            ? (
                              <ChevronUp
                                size={16}
                              />
                            )

                            : (
                              <ChevronDown
                                size={16}
                              />
                            )
                        }

                        Details

                      </button>

                    </td>

                  </tr>


                  {/* EXPANDED ROW */}

                  {
                    expandedRow === item._id && (

                      <tr>

                        <td
                          colSpan="5"
                          className="
                            bg-slate-50/70
                            px-8
                            py-6
                          "
                        >

                          <div
                            className="
                              grid
                              gap-4
                            "
                          >

                            {
                              item.sessions?.map(
                                (
                                  session,
                                  index
                                ) => (

                                  <div
                                    key={index}
                                    className="
                                      bg-white
                                      rounded-2xl
                                      border
                                      border-slate-100
                                      p-5
                                      flex
                                      items-center
                                      justify-between
                                      flex-wrap
                                      gap-4
                                    "
                                  >

                                    <div>

                                      <p
                                        className="
                                          text-xs
                                          uppercase
                                          tracking-widest
                                          text-slate-400
                                          mb-2
                                        "
                                      >
                                        Session
                                        {" "}
                                        {index + 1}
                                      </p>

                                      <div
                                        className="
                                          flex
                                          items-center
                                          gap-3
                                          flex-wrap
                                        "
                                      >

                                        <span
                                          className="
                                            px-3
                                            py-1.5
                                            rounded-xl
                                            bg-blue-50
                                            text-blue-700
                                            text-sm
                                            font-medium
                                          "
                                        >
                                          IN
                                          {" "}
                                          {formatTime(
                                            session.check_in
                                          )}
                                        </span>

                                        <span
                                          className="
                                            text-slate-400
                                          "
                                        >
                                          →
                                        </span>

                                        <span
                                          className={`
                                            px-3
                                            py-1.5
                                            rounded-xl
                                            text-sm
                                            font-medium

                                            ${
                                              session.check_out

                                                ? `
                                                  bg-red-50
                                                  text-red-600
                                                `

                                                : `
                                                  bg-emerald-50
                                                  text-emerald-700
                                                `
                                            }
                                          `}
                                        >
                                          {
                                            session.check_out

                                              ? `
                                                OUT
                                                ${formatTime(
                                                  session.check_out
                                                )}
                                              `

                                              : "ACTIVE SESSION"
                                          }
                                        </span>

                                      </div>

                                    </div>


                                    {/* SESSION TOTAL */}

                                    <div>

                                      <p
                                        className="
                                          text-xs
                                          uppercase
                                          tracking-widest
                                          text-slate-400
                                          mb-2
                                        "
                                      >
                                        Duration
                                      </p>

                                      <h3
                                        className="
                                          text-lg
                                          font-bold
                                          text-slate-800
                                        "
                                      >
                                        {
                                          session.total_minutes
                                            ? (
                                                session.total_minutes / 60
                                              ).toFixed(1)
                                            : "0"
                                        }
                                        h
                                      </h3>

                                    </div>

                                  </div>
                                )
                              )
                            }

                          </div>

                        </td>

                      </tr>
                    )
                  }

                </>
              );
            }
          )
        )}

      </tbody>

    </table>

  </div>


  {/* ====================================================== */}
  {/* MOBILE VIEW */}
  {/* ====================================================== */}

  <div
    className="
      lg:hidden
      p-4
      space-y-4
    "
  >

    {loading ? (

      <div
        className="
          text-center
          py-16
          text-slate-400
        "
      >
        Loading attendance...
      </div>

    ) : attendance.length === 0 ? (

      <div
        className="
          text-center
          py-16
          text-slate-400
        "
      >
        No attendance records found
      </div>

    ) : (

      attendance.map((item) => {

        const activeSession =
          item.sessions?.some(
            (session) =>
              !session.check_out
          );

        return (

          <div
            key={item._id}
            className="
              border
              border-slate-100
              rounded-2xl
              p-4
              bg-white
              shadow-sm
              space-y-4
            "
          >

            {/* TOP */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-3
              "
            >

              <div>

                <h3
                  className="
                    font-bold
                    text-slate-800
                  "
                >
                  {item.date}
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-1
                  "
                >
                  {formatDay(item.date)}
                </p>

              </div>


              {
                activeSession

                  ? (
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-emerald-100
                        text-emerald-700
                        text-xs
                        font-semibold
                      "
                    >
                      Active
                    </span>
                  )

                  : (
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-red-100
                        text-red-600
                        text-xs
                        font-semibold
                      "
                    >
                      Checked Out
                    </span>
                  )
              }

            </div>


            {/* SESSIONS */}

            <div
              className="
                space-y-3
              "
            >

              {
                item.sessions?.map(
                  (
                    session,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        bg-slate-50
                        rounded-xl
                        p-3
                        space-y-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          flex-wrap
                        "
                      >

                        <span
                          className="
                            px-3
                            py-1
                            rounded-lg
                            bg-blue-50
                            text-blue-700
                            text-xs
                            font-medium
                          "
                        >
                          IN
                          {" "}
                          {formatTime(
                            session.check_in
                          )}
                        </span>

                        <span
                          className="
                            text-slate-400
                          "
                        >
                          →
                        </span>

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-lg
                            text-xs
                            font-medium

                            ${
                              session.check_out

                                ? `
                                  bg-red-50
                                  text-red-600
                                `

                                : `
                                  bg-emerald-50
                                  text-emerald-700
                                `
                            }
                          `}
                        >
                          {
                            session.check_out

                              ? `
                                OUT
                                ${formatTime(
                                  session.check_out
                                )}
                              `

                              : "ACTIVE"
                          }
                        </span>

                      </div>


                      <div>

                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-widest
                            text-slate-400
                            mb-1
                          "
                        >
                          Duration
                        </p>

                        <h3
                          className="
                            text-sm
                            font-bold
                            text-slate-800
                          "
                        >
                          {
                            session.total_minutes
                              ? (
                                  session.total_minutes / 60
                                ).toFixed(1)
                              : "0"
                          }
                          h
                        </h3>

                      </div>

                    </div>
                  )
                )
              }

            </div>


            {/* TOTAL */}

            <div
              className="
                pt-2
                border-t
                border-slate-100
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-widest
                    text-slate-400
                    mb-1
                  "
                >
                  Total Time
                </p>

                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-800
                  "
                >
                  {
                    item.total_hours || 0
                  }
                  h
                  {" "}
                  {
                    item.total_minutes || 0
                  }
                  m
                </h3>

              </div>

            </div>

          </div>
        );
      })
    )}

  </div>
        </div>
      </div>
    </div>
  );
}
