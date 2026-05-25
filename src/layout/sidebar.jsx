import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  Folder,
  ListTodo,
  Settings,
  X,
  MessageSquare,
  MessageCircle,
  LogOut,
} from "lucide-react";

import { usePermissions } from "../context/permissioncontext";

// 🔥 ICON MAP (IMPORTANT)
const iconMap = {
  dashboard: LayoutDashboard,
  user: Users,
  users: Users,
  leave: Calendar,
  attendance: Clock,
  projects: Folder,
  tasks: ListTodo,
  tickets: MessageSquare,
  invoices: Folder,
  excel: Folder,
  roles: Settings,
  fields: Settings,
  chat: MessageCircle,
  calendar: Calendar,
};

export default function Sidebar({
  collapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [showLogoutModal, setShowLogoutModal] =
  useState(false);

  const { modules, loading } = usePermissions();

  // 🔥 LOGOUT
  const handle_logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("role");

  localStorage.removeItem("userId");

  localStorage.removeItem("username");

  navigate("/login", {
    replace: true,
  });
};

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static z-50 top-0 left-0 h-full
          ${collapsed ? "w-20" : "w-64"}
          bg-white border-r border-slate-200 p-4 shadow-sm
          transform transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* CONTENT */}
        <div className="overflow-y-auto hide-scrollbar flex-1">

          {/* MOBILE HEADER */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h1 className="text-indigo-600 font-semibold">hr admin</h1>
            <button onClick={() => setMobileOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* TITLE */}
          <h1
            className={`hidden lg:block text-indigo-600 font-semibold mb-8 ${
              collapsed ? "text-center" : ""
            }`}
          >
            {!collapsed && (role === "admin" ? "Admin Panel"  : role === "hr" ? "HR Panel": role === "manager" ? "Manager Panel": "User Panel")}
          </h1>

          {/* 🔥 MENU FROM BACKEND */}
          <div className="space-y-2">

            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : modules.length === 0 ? (
              <p className="text-sm text-gray-400">No modules assigned</p>
            ) : (
              modules.map((mod) => {

                const Icon = iconMap[mod.name.toLowerCase()] || Folder;

                return (
                  <div key={mod._id} className="relative group">
                    <NavLink
                      to={mod.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-xl transition ${
                          isActive
                            ? "bg-indigo-100 text-indigo-600 border border-indigo-200"
                            : "hover:bg-slate-100 text-slate-600"
                        }`
                      }
                    >
                      <Icon size={18} />
                      {!collapsed && (
                        <span className="capitalize">
                          {mod.name}
                        </span>
                      )}
                    </NavLink>

                    {/* TOOLTIP */}
                    {collapsed && (
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                        {mod.name}
                      </span>
                    )}
                  </div>
                );
              })
            )}

          </div>
        </div>

        {/* LOGOUT */}
        <div className="pt-4 border-t">
          <button
             onClick={() =>
    setShowLogoutModal(true)
  }
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
        {/* LOGOUT MODAL */}
{showLogoutModal && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] px-4">

    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">

      {/* ICON */}
      <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">

        <LogOut
          size={28}
          className="text-red-500"
        />

      </div>

      {/* TITLE */}
      <h2 className="text-xl font-bold text-center text-slate-800">
        Logout Confirmation
      </h2>

      {/* MESSAGE */}
      <p className="text-sm text-slate-500 text-center mt-2">
        Are you sure you want to logout
        from your account?
      </p>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={() =>
            setShowLogoutModal(false)
          }
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handle_logout}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
        >
          Logout
        </button>

      </div>

    </div>

  </div>
)}
      </div>
    </>
  );
}