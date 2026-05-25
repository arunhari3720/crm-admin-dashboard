import React,
{
  useEffect,
  useState
} from "react";

import {
  Activity,
  Users,
  Search,
  Eye,
  X,
  CalendarDays,
  Building2,
  ShieldCheck,
  CheckCircle2,
  XCircle
} from "lucide-react";

import API from "../services/api";

export default function AttendanceMonitor() {

  // ======================================================
  // STATES
  // ======================================================

  const [employees, setEmployees] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [liveUsers, setLiveUsers] =
    useState([]);


  // ======================================================
  // FETCH ATTENDANCE
  // ======================================================

  const fetchAttendance =
    async () => {

      try {

        const res =
          await API.get(
            "/attendance/all-attendance"
          );

        const raw =
          res.data.data || [];


        // ======================================================
        // GROUP USERS
        // ======================================================

        const groupedUsers = {};

        raw.forEach((item) => {

          const userId =
            item.user?._id;

          if (!userId)
            return;

          // ======================================================
          // ACTIVE SESSION
          // ======================================================

          const active =
            item.sessions?.some(
              (s) =>
                !s.check_out
            );

          if (
            !groupedUsers[userId]
          ) {

            groupedUsers[userId] = {

              user:
                item.user,

              total_days: 0,

              total_hours: 0,

              active: false
            };
          }

          groupedUsers[userId]
            .total_days += 1;

          groupedUsers[userId]
            .total_hours +=
            Number(
              item.total_hours || 0
            );

          if (active) {

            groupedUsers[userId]
              .active = true;
          }
        });

        setEmployees(
          Object.values(
            groupedUsers
          )
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };


  // ======================================================
  // FETCH LIVE USERS
  // ======================================================

  const fetchLiveUsers =
    async () => {

      try {

        const res =
          await API.get(
            "/attendance/live-attendance"
          );

        setLiveUsers(
          res.data.data || []
        );

      } catch (err) {

        console.log(err);
      }
    };


  // ======================================================
  // FETCH USER HISTORY
  // ======================================================

  const fetchUserHistory =
    async (userId) => {

      try {

        setHistoryLoading(
          true
        );

        const res =
          await API.get(
            `/attendance/user/${userId}`
          );

        setHistory(
          res.data.data || []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setHistoryLoading(
          false
        );
      }
    };


  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {

    fetchAttendance();

    fetchLiveUsers();

  }, []);


  // ======================================================
  // AUTO REFRESH
  // ======================================================

  useEffect(() => {

    const interval =
      setInterval(() => {

        fetchAttendance();

        fetchLiveUsers();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);


  // ======================================================
  // FORMAT TIME
  // ======================================================

  const formatTime =
    (value) => {

      if (!value)
        return "—";

      return new Date(
        value
      ).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );
    };


  // ======================================================
  // FILTER USERS
  // ======================================================

  const filteredUsers =
    employees.filter(
      (item) => {

        const name =
          item.user?.name
            ?.toLowerCase() || "";

        const department =
          item.user?.department
            ?.toLowerCase() || "";

        const role =
          item.user?.role
            ?.toLowerCase() || "";

        return (
          name.includes(
            search.toLowerCase()
          ) ||

          department.includes(
            search.toLowerCase()
          ) ||

          role.includes(
            search.toLowerCase()
          )
        );
      }
    );


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
        {/* HEADER */}
        {/* ====================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            flex-wrap
            gap-4
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-slate-900
              "
            >
              Attendance Monitor
            </h1>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Live employee attendance
              monitoring dashboard
            </p>

          </div>


          {/* LIVE BADGE */}

          <div
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
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

            Live Monitoring

          </div>

        </div>


        {/* ====================================================== */}
        {/* CARDS */}
        {/* ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >

          {/* TOTAL EMPLOYEES */}

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
                  Total Employees
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-900
                  "
                >
                  {
                    employees.length
                  }
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

                <Users
                  size={24}
                />

              </div>

            </div>

          </div>


          {/* LIVE USERS */}

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
                  Live Employees
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-900
                  "
                >
                  {
                    liveUsers.length
                  }
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

                <Activity
                  size={24}
                />

              </div>

            </div>

          </div>


          {/* CHECKED OUT */}

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
                  Checked Out
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    text-slate-900
                  "
                >
                  {
                    employees.length -
                    liveUsers.length
                  }
                </h2>

              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-red-50
                  text-red-600
                  flex
                  items-center
                  justify-center
                "
              >

                <CheckCircle2
                  size={24}
                />

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================== */}
        {/* SEARCH */}
        {/* ====================================================== */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-slate-100
            p-5
            shadow-sm
          "
        >

          <div
            className="
              relative
            "
          >

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="
                Search employee,
                role or department...
              "
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                h-12
                rounded-2xl
                border
                border-slate-200
                pl-12
                pr-4
                text-sm
                outline-none
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>

        </div>


        {/* ====================================================== */}
        {/* EMPLOYEE TABLE */}
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

          {/* TABLE HEADER */}

          <div
            className="
              px-8
              py-6
              border-b
              border-slate-100
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Employee List
            </h2>

            <p
              className="
                text-sm
                text-slate-400
                mt-1
              "
            >
              Double click or view
              full attendance history
            </p>

          </div>


          {/* TABLE */}

          <div
            className="
              overflow-x-auto
            "
          >

            <table
              className="
                w-full
                min-w-[1000px]
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
                    Employee
                  </th>

                  <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Department
                  </th>

                  <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Role
                  </th>

                  <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Total Days
                  </th>

                  <th className="text-left px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Total Hours
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
                      colSpan="7"
                      className="
                        text-center
                        py-20
                        text-slate-400
                      "
                    >
                      Loading employees...
                    </td>

                  </tr>

                ) : (

                  filteredUsers.map(
                    (item) => (

                      <tr
                        key={
                          item.user._id
                        }
                        onDoubleClick={() => {

                          setSelectedUser(
                            item.user
                          );

                          fetchUserHistory(
                            item.user._id
                          );
                        }}
                        className="
                          border-b
                          border-slate-100
                          hover:bg-slate-50
                          transition-all
                          cursor-pointer
                        "
                      >

                        {/* EMPLOYEE */}

                        <td
                          className="
                            px-8
                            py-6
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-4
                            "
                          >

                            <div
                              className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-gradient-to-br
                                from-blue-100
                                to-violet-100
                                flex
                                items-center
                                justify-center
                                font-bold
                                text-slate-700
                              "
                            >
                              {
                                item.user?.name
                                  ?.charAt(0)
                                  ?.toUpperCase()
                              }
                            </div>

                            <div>

                              <h3
                                className="
                                  font-semibold
                                  text-slate-800
                                "
                              >
                                {
                                  item.user?.name
                                }
                              </h3>

                              <p
                                className="
                                  text-sm
                                  text-slate-400
                                  mt-1
                                "
                              >
                                {
                                  item.user?.email
                                }
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* DEPARTMENT */}

                        <td
                          className="
                            px-8
                            py-6
                          "
                        >

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              text-sm
                              font-medium
                              text-slate-700
                            "
                          >

                            <Building2
                              size={14}
                            />

                            {
                              item.user?.department ||
                              "N/A"
                            }

                          </span>

                        </td>


                        {/* ROLE */}

                        <td
                          className="
                            px-8
                            py-6
                          "
                        >

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-1.5
                              rounded-xl
                              bg-slate-100
                              text-slate-700
                              text-xs
                              font-semibold
                            "
                          >

                            <ShieldCheck
                              size={13}
                            />

                            {
                              item.user?.role
                            }

                          </span>

                        </td>


                        {/* DAYS */}

                        <td
                          className="
                            px-8
                            py-6
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            item.total_days
                          }
                        </td>


                        {/* HOURS */}

                        <td
                          className="
                            px-8
                            py-6
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            item.total_hours.toFixed(1)
                          }
                          h
                        </td>


                        {/* STATUS */}

                        <td
                          className="
                            px-8
                            py-6
                          "
                        >

                          {
                            item.active

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

                                  <XCircle
                                    size={13}
                                  />

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
                            onClick={() => {

                              setSelectedUser(
                                item.user
                              );

                              fetchUserHistory(
                                item.user._id
                              );
                            }}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-xl
                              bg-blue-50
                              text-blue-700
                              hover:bg-blue-100
                              text-sm
                              font-medium
                              transition-all
                            "
                          >

                            <Eye
                              size={15}
                            />

                            View History

                          </button>

                        </td>

                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* ====================================================== */}
        {/* HISTORY MODAL */}
        {/* ====================================================== */}

        {
          selectedUser && (

            <div
              className="
                fixed
                inset-0
                bg-black/40
                backdrop-blur-sm
                z-50
                flex
                justify-end
              "
            >

              <div
                className="
                  w-full
                  md:w-[650px]
                  h-full
                  bg-white
                  shadow-2xl
                  overflow-y-auto
                "
              >

                {/* HEADER */}

                <div
                  className="
                    sticky
                    top-0
                    bg-white
                    border-b
                    border-slate-100
                    px-6
                    py-5
                    flex
                    items-center
                    justify-between
                    z-10
                  "
                >

                  <div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      {
                        selectedUser.name
                      }
                    </h2>

                    <p
                      className="
                        text-sm
                        text-slate-400
                        mt-1
                      "
                    >
                      Full attendance history
                    </p>

                  </div>

                  <button
                    onClick={() => {

                      setSelectedUser(
                        null
                      );

                      setHistory([]);
                    }}
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-slate-100
                      hover:bg-slate-200
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <X size={18} />

                  </button>

                </div>


                {/* BODY */}

                <div
                  className="
                    p-6
                    space-y-5
                  "
                >

                  {
                    historyLoading ? (

                      <div
                        className="
                          text-center
                          py-20
                          text-slate-400
                        "
                      >
                        Loading history...
                      </div>

                    ) : (

                      history.map(
                        (item) => (

                          <div
                            key={item._id}
                            className="
                              bg-slate-50
                              border
                              border-slate-100
                              rounded-3xl
                              overflow-hidden
                            "
                          >

                            {/* DATE */}

                            <div
                              className="
                                px-6
                                py-4
                                border-b
                                border-slate-100
                                flex
                                items-center
                                justify-between
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >

                                <div
                                  className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-blue-100
                                    text-blue-700
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >

                                  <CalendarDays
                                    size={18}
                                  />

                                </div>

                                <div>

                                  <h3
                                    className="
                                      font-semibold
                                      text-slate-800
                                    "
                                  >
                                    {
                                      item.date
                                    }
                                  </h3>

                                </div>

                              </div>

                              <div
                                className="
                                  text-right
                                "
                              >

                                <p
                                  className="
                                    text-xs
                                    text-slate-400
                                  "
                                >
                                  Total Hours
                                </p>

                                <h3
                                  className="
                                    text-lg
                                    font-bold
                                    text-slate-800
                                  "
                                >
                                  {
                                    item.total_hours
                                  }
                                  h
                                </h3>

                              </div>

                            </div>


                            {/* SESSIONS */}

                            <div
                              className="
                                p-6
                                space-y-4
                              "
                            >

                              {
                                item.sessions?.map(
                                  (
                                    session,
                                    index
                                  ) => {

                                    const active =
                                      !session.check_out;

                                    return (

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
                                              mb-3
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

                                            <span>
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
                                                  active

                                                    ? `
                                                      bg-emerald-50
                                                      text-emerald-700
                                                    `

                                                    : `
                                                      bg-red-50
                                                      text-red-600
                                                    `
                                                }
                                              `}
                                            >
                                              {
                                                active

                                                  ? "ACTIVE"

                                                  : `
                                                    OUT
                                                    ${formatTime(
                                                      session.check_out
                                                    )}
                                                  `
                                              }
                                            </span>

                                          </div>

                                        </div>


                                        {/* DURATION */}

                                        <div
                                          className="
                                            text-right
                                          "
                                        >

                                          <p
                                            className="
                                              text-xs
                                              text-slate-400
                                              mb-1
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
                                    );
                                  }
                                )
                              }

                            </div>

                          </div>
                        )
                      )
                    )
                  }

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}