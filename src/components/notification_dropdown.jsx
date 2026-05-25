// src/components/notification_dropdown.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";
import toast from "react-hot-toast";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  // 🔄 Fetch notifications
  const fetchNotifications = async () => {
    const res = await axios.get("/notifications");
    setNotifications(res.data.data);
  };

  // 🔢 Fetch unread count
  const fetchCount = async () => {
    const res = await axios.get("/notifications/unread-count");
    setCount(res.data.count);
  };

  // ✅ Mark as read
  const markAsRead = async (id) => {
    await axios.put(`/notifications/read/${id}`);
    toast.success("Marked as read");
    fetchNotifications();
    fetchCount();
  };

  // 🗑 Delete
  const deleteNotif = async (id) => {
    await axios.delete(`/notifications/${id}`);
    toast.success("Notification deleted");
    fetchNotifications();
    fetchCount();
  };

  // ✅ Mark all read
  const markAllRead = async () => {
    await axios.put("/notifications/read-all");
    toast.success("All marked as read");
    fetchNotifications();
    fetchCount();
  };

  useEffect(() => {
    fetchNotifications();
    fetchCount();

    // 🔥 Auto refresh (real-time feel)
    const interval = setInterval(() => {
      fetchNotifications();
      fetchCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      
      {/* 🔔 Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-xl hover:scale-110 transition"
      >
        🔔

        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full shadow">
            {count}
          </span>
        )}
      </button>

      {/* 📥 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl rounded-2xl z-50 border border-gray-700 animate-fadeIn">

          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <button
              onClick={markAllRead}
              className="text-xs text-blue-400 hover:underline"
            >
              Mark all read
            </button>
          </div>

          {/* Body */}
          <div className="max-h-96 overflow-y-auto custom-scroll">

            {notifications.length === 0 && (
              <p className="p-6 text-sm text-gray-400 text-center">
                No notifications
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n._id}
                className={`p-4 border-b border-gray-700 transition hover:bg-gray-800 ${
                  n.is_read ? "opacity-60" : ""
                }`}
              >
                {/* Title */}
                <p className="font-semibold text-sm">
                  {n.title || "Notification"}
                </p>

                {/* Message */}
                <p className="text-xs text-gray-400 mt-1">
                  {n.message}
                </p>

                {/* 🔥 Meeting Link */}
                {n.meeting_link && (
                  <a
                    href={n.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 text-xs mt-2 inline-block hover:underline"
                  >
                    🔗 Join Meeting
                  </a>
                )}

                {/* Actions */}
                <div className="flex gap-4 mt-3 text-xs">
                  {!n.is_read && (
                    <button
                      onClick={() => markAsRead(n._id)}
                      className="text-green-400 hover:underline"
                    >
                      ✅ Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotif(n._id)}
                    className="text-red-400 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}