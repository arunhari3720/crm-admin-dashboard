import { useState } from "react";

import Sidebar from "./sidebar";
import Navbar from "./navbar";

import AppRoutes from "../routes/approutes";


export default function MainLayout() {

  

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);


  // =====================================
  // STATIC PERMISSIONS
  // =====================================
  const [permissions, setPermissions] =
    useState({

      dashboard: true,

      employees: true,

      leave: true,

      attendance: true,

      projects: true,

      tasks: true,

      roles: true,

      tickets: true,

      chat: true,

      ProjectList: true,

      excel: true,

    });


  return (

    <div
      className="
        flex
        h-screen
        bg-slate-50
        text-slate-900
        overflow-hidden
      "
    >

      {/* ===================================== */}
      {/* SIDEBAR */}
      {/* ===================================== */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        permissions={permissions}
      />


      {/* ===================================== */}
      {/* RIGHT SECTION */}
      {/* ===================================== */}
      <div
        className="
          flex-1
          flex
          flex-col
          overflow-hidden
          min-w-0
          min-h-0
        "
      >

        {/* ===================================== */}
        {/* NAVBAR */}
        {/* ===================================== */}
        <Navbar
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />


        {/* ===================================== */}
        {/* PAGE CONTENT */}
        {/* ===================================== */}
        <main
          className="
            flex-1
            overflow-auto
            min-w-0
            min-h-0
            p-4
            sm:p-6
            bg-slate-50
          "
        >

          {/* DEBUG */}
          <div className="hidden">
            APP ROUTES SECTION
          </div>

          <AppRoutes />

        </main>

      </div>

    </div>
  );
}