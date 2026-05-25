import {
  Menu,
  Bell,
  Search,
  CheckCheck,
  Trash2,
  Loader2,
  Clock3,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import axios from "../services/api";

import toast from "react-hot-toast";

export default function Navbar({
  setCollapsed,
  setMobileOpen,
}) {

  // ======================================================
  // STATES
  // ======================================================

  const [checkedIn, setCheckedIn] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [count, setCount] =
    useState(0);

  const [open, setOpen] =
    useState(false);

  const [todayHours, setTodayHours] =
    useState(0);

  // ======================================================
  // USER
  // ======================================================

  const username =
    localStorage.getItem(
      "username"
    );

  const role =
    localStorage.getItem(
      "role"
    );

  // ======================================================
  // FETCH TODAY STATUS
  // ======================================================

  const fetchTodayStatus =
    async () => {

      try {

        const res =
          await axios.get(
            "/attendance/my-attendance"
          );

        const today =
          new Date()
            .toISOString()
            .split("T")[0];

        const todayAttendance =
          res.data.data.find(
            (item) =>
              item.date === today
          );

        // NO ATTENDANCE

        if (!todayAttendance) {

          setCheckedIn(false);

          setTodayHours(0);

          return;
        }

        // CHECK OPEN SESSION

        const openSession =
          todayAttendance.sessions?.find(
            (session) =>
              !session.check_out
          );

        setCheckedIn(
          !!openSession
        );

        setTodayHours(
          todayAttendance.total_hours ||
            0
        );

      } catch (err) {

        console.log(err);
      }
    };

  // ======================================================
  // HANDLE ATTENDANCE
  // ======================================================

  const handleAttendance =
    async () => {

      try {

        setLoading(true);

        // CHECK OUT

        if (checkedIn) {

          await axios.post(
            "/attendance/check-out"
          );

          toast.success(
            "Checked out successfully"
          );

          setCheckedIn(false);

        } else {

          // CHECK IN

          await axios.post(
            "/attendance/check-in"
          );

          toast.success(
            "Checked in successfully"
          );

          setCheckedIn(true);
        }

        fetchTodayStatus();

      } catch (err) {

        toast.error(
          err?.response?.data
            ?.message ||
            "Operation failed"
        );

      } finally {

        setLoading(false);
      }
    };

  // ======================================================
  // FETCH NOTIFICATIONS
  // ======================================================

  const fetchNotifications =
    async () => {

      try {

        const res =
          await axios.get(
            "/notifications"
          );

        setNotifications(
          res.data.data || []
        );

      } catch (err) {

        console.log(err);
      }
    };

  // ======================================================
  // FETCH COUNT
  // ======================================================

  const fetchCount =
    async () => {

      try {

        const res =
          await axios.get(
            "/notifications/unread-count"
          );

        setCount(
          res.data.count || 0
        );

      } catch (err) {

        console.log(err);
      }
    };

  // ======================================================
  // MARK AS READ
  // ======================================================

  const markAsRead =
    async (id) => {

      try {

        await axios.put(
          `/notifications/read/${id}`
        );

        toast.success(
          "Marked as read"
        );

        fetchNotifications();

        fetchCount();

      } catch (err) {

        toast.error(
          "Failed to update"
        );
      }
    };

  // ======================================================
  // DELETE NOTIFICATION
  // ======================================================

  const deleteNotif =
    async (id) => {

      try {

        await axios.delete(
          `/notifications/${id}`
        );

        toast.success(
          "Notification deleted"
        );

        fetchNotifications();

        fetchCount();

      } catch (err) {

        toast.error(
          "Delete failed"
        );
      }
    };

  // ======================================================
  // MARK ALL READ
  // ======================================================

  const markAllRead =
    async () => {

      try {

        await axios.put(
          "/notifications/read-all"
        );

        toast.success(
          "All notifications marked"
        );

        fetchNotifications();

        fetchCount();

      } catch (err) {

        toast.error(
          "Operation failed"
        );
      }
    };

  // ======================================================
  // LOAD
  // ======================================================

  useEffect(() => {

    fetchNotifications();

    fetchCount();

    fetchTodayStatus();

    const interval =
      setInterval(() => {

        fetchNotifications();

        fetchCount();

        fetchTodayStatus();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);
// ======================================================
// LIVE NOTIFICATION REFRESH
// ======================================================

useEffect(() => {

  const refreshNotifications =
    () => {

      fetchNotifications();

      fetchCount();
    };

  window.addEventListener(
    "notification-refresh",
    refreshNotifications
  );

  return () => {

    window.removeEventListener(
      "notification-refresh",
      refreshNotifications
    );
  };

}, []);

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b shadow-sm">

      <div className="flex items-center justify-between px-4 lg:px-6 py-3">

        {/* ====================================================== */}
        {/* LEFT */}
        {/* ====================================================== */}

        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border bg-white hover:bg-gray-100 transition"
          >
            <Menu size={18} />
          </button>

          {/* DESKTOP MENU */}

          <button
            onClick={() =>
              setCollapsed(
                (prev) => !prev
              )
            }
            className="hidden lg:flex w-10 h-10 items-center justify-center rounded-xl border bg-white hover:bg-gray-100 transition"
          >
            <Menu size={18} />
          </button>

          {/* TITLE */}

          <div>

            <h2 className="text-lg lg:text-xl font-bold text-gray-800 capitalize">
              {role} Panel
            </h2>

            <p className="text-xs lg:text-sm text-gray-500">
              Welcome back,{" "}
              {username}
            </p>

          </div>

        </div>

        {/* ====================================================== */}
        {/* RIGHT */}
        {/* ====================================================== */}

        <div className="flex items-center gap-2 lg:gap-4">

          {/* STATUS */}

          <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl">

            <span
              className={`w-3 h-3 rounded-full ${
                checkedIn
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

            <div>

              <p className="text-sm font-semibold text-gray-700">

                {checkedIn
                  ? "Checked In"
                  : "Checked Out"}

              </p>

              <p className="text-xs text-gray-500">

                {todayHours} hrs today

              </p>

            </div>

          </div>

          {/* ATTENDANCE BUTTON */}

          <button
            onClick={
              handleAttendance
            }
            disabled={loading}
           className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition shadow-sm ${
              checkedIn
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >

            {loading && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {!loading && (
              <Clock3 size={16} />
            )}

            {checkedIn
              ? "Check Out"
              : "Check In"}

          </button>

          {/* SEARCH */}

          <div className="hidden lg:flex items-center bg-gray-100 rounded-2xl px-3 py-2 w-64">

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm px-2 w-full"
            />

          </div>

          {/* ====================================================== */}
          {/* NOTIFICATIONS */}
          {/* ====================================================== */}

          <div className="relative static sm:relative">

            <button
              onClick={() =>
                setOpen(!open)
              }
              className="relative w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <Bell size={20} />

              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full shadow">
                  {count}
                </span>
              )}
            </button>

            {open && (
             <div
  className="
  
  fixed
  left-1/2
  -translate-x-1/2
  top-20
  w-[92vw]
  sm:absolute
  sm:left-auto
  sm:translate-x-0
  sm:right-0
  sm:top-14
  sm:w-[380px]
  max-w-[380px]
  bg-white
  border
  shadow-2xl
  rounded-3xl
  overflow-hidden
  z-[9999]

  "
>

                {/* HEADER */}

                <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">

                  <div>

                    <h3 className="font-bold text-gray-800">
                      Notifications
                    </h3>

                    <p className="text-xs text-gray-500">
                      Recent activities
                    </p>

                  </div>

                  <button
                    onClick={
                      markAllRead
                    }
                    className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-3 py-1.5 rounded-xl hover:bg-blue-200 transition"
                  >
                    <CheckCheck size={14} />
                    Mark All
                  </button>

                </div>

                {/* LIST */}

                <div className="max-h-[420px] overflow-y-auto">

                  {notifications.length ===
                  0 ? (
                    <div className="p-10 text-center">

                      <Bell
                        size={45}
                        className="mx-auto text-gray-300 mb-3"
                      />

                      <p className="text-sm text-gray-500">
                        No notifications yet
                      </p>

                    </div>
                  ) : (
                    notifications.map(
                      (n) => (
                        <div
                          key={n._id}
                          className={`p-4 border-b hover:bg-gray-50 transition ${
                            !n.is_read
                              ? "bg-blue-50/50"
                              : ""
                          }`}
                        >

                          <div className="flex justify-between gap-3">

                            <div className="flex-1">

                              <h4 className="font-semibold text-sm text-gray-800">
                                {n.title}
                              </h4>

                              <p className="text-xs text-gray-500 mt-1 leading-relaxed break-words">
                                {n.message}
                              </p>

                              <p className="text-[11px] text-gray-400 mt-2">
                                {new Date(
                                  n.created_at
                                ).toLocaleString()}
                              </p>

                            </div>

                            {!n.is_read && (
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2" />
                            )}

                          </div>

                          <div className="flex items-center gap-3 mt-3">

                            {!n.is_read && (
                              <button
                                onClick={() =>
                                  markAsRead(
                                    n._id
                                  )
                                }
                                className="text-xs text-green-600 hover:text-green-700 font-medium"
                              >
                                Mark Read
                              </button>
                            )}

                            <button
                              onClick={() =>
                                deleteNotif(
                                  n._id
                                )
                              }
                              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
                            >
                              <Trash2
                                size={12}
                              />
                              Delete
                            </button>

                          </div>

                        </div>
                      )
                    )
                  )}

                </div>

              </div>
            )}

          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-3 pl-2">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold uppercase shadow-lg">
              {username?.charAt(0)}
            </div>

            <div className="hidden md:block">

              <h4 className="text-sm font-semibold text-gray-800 capitalize">
                {username}
              </h4>

              <p className="text-xs text-gray-500 capitalize">
                {role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}