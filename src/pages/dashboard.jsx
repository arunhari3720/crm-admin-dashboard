import LineChartComponent from "../components/charts/linechart";
import PieChartComponent from "../components/charts/piechart";

import {
  Users,
  Folder,
  Calendar,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
 //console.log("DASHBOARD LOADED");

/* 📊 DATA */
const lineData = [
  { name: "jan", value: 400 },
  { name: "feb", value: 300 },
  { name: "mar", value: 500 },
  { name: "apr", value: 700 },
  { name: "may", value: 600 },
];

const pieData = [
  { name: "approved", value: 12 },
  { name: "pending", value: 4 },
  { name: "rejected", value: 2 },
];

/* KPI DATA */
const kpis = [
  {
    title: "employees",
    value: "120",
    growth: "+8.2%",
    icon: Users,
    color:
      "from-indigo-500 to-violet-600",
    bg:
      "bg-indigo-50 text-indigo-600 border border-indigo-200",
  },

  {
    title: "projects",
    value: "32",
    growth: "+4.1%",
    icon: Folder,
    color:
      "from-emerald-500 to-green-600",
    bg:
      "bg-emerald-50 text-emerald-600 border border-emerald-200",
  },

  {
    title: "leave",
    value: "18",
    growth: "-2.4%",
    icon: Calendar,
    color:
      "from-rose-500 to-pink-600",
    bg:
      "bg-rose-50 text-rose-600 border border-rose-200",
  },

  {
    title: "growth",
    value: "+12%",
    growth: "+10.5%",
    icon: TrendingUp,
    color:
      "from-amber-500 to-orange-500",
    bg:
      "bg-amber-50 text-amber-600 border border-amber-200",
  },
];

/* EMPLOYEES */
const employees = [
  {
    name: "john",
    role: "developer",
    status: "active",
  },

  {
    name: "sara",
    role: "hr",
    status: "on leave",
  },

  {
    name: "alex",
    role: "manager",
    status: "active",
  },

  {
    name: "mike",
    role: "designer",
    status: "inactive",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        "
      >

        {/* LEFT */}
        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-[3px]
              text-indigo-600
              font-semibold
            "
          >
            CRM Dashboard
          </p>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
              mt-2
            "
          >
            Welcome Back, Admin 👋
          </h1>

          <p
            className="
              text-sm
              text-slate-500
              mt-2
            "
          >
            Monitor company performance and employee analytics.
          </p>

        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            gap-4
            flex-wrap
          "
        >

          <div
            className="
              px-5
              py-4
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Revenue
            </p>

            <h3
              className="
                text-xl
                font-bold
                text-slate-800
                mt-2
              "
            >
              $24.5K
            </h3>
          </div>

          <div
            className="
              px-5
              py-4
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Active Users
            </p>

            <h3
              className="
                text-xl
                font-bold
                text-slate-800
                mt-2
              "
            >
              1,240
            </h3>
          </div>

        </div>

      </div>

      {/* HERO + KPI */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-5
          gap-5
        "
      >

        {/* HERO CARD */}
        <div
          className="
            xl:col-span-2
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-br
            from-indigo-600
            via-violet-600
            to-purple-700
            p-7
            text-white
            shadow-[0_20px_60px_rgba(99,102,241,0.30)]
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,_white,_transparent)]
              opacity-20
            "
          />

          {/* CIRCLE */}
          <div
            className="
              absolute
              -right-10
              -bottom-10
              w-56
              h-56
              rounded-full
              border
              border-white/10
            "
          />

          <div className="relative z-10">

            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                text-white/70
              "
            >
              productivity
            </p>

            <h2
              className="
                text-3xl
                font-bold
                leading-tight
                mt-4
              "
            >
              Have a Productive Day 🚀
            </h2>

            <p
              className="
                text-sm
                text-white/80
                mt-5
                leading-relaxed
                max-w-md
              "
            >
              Manage projects, employees,
              analytics, and team productivity
              from one dashboard.
            </p>

            <button
              className="
                mt-7
                px-5
                py-3
                rounded-2xl
                bg-white
                text-slate-800
                text-sm
                font-semibold
                hover:scale-[1.03]
                transition-all
                duration-300
                shadow-lg
              "
            >
              Explore Dashboard
            </button>

          </div>

        </div>

        {/* KPI GRID */}
        <div
          className="
            xl:col-span-3
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
          "
        >

          {kpis.map((item, i) => (
            <div
              key={i}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-slate-200/80
                bg-white
                p-6
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-indigo-200
                hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)]
              "
            >

              {/* TOP LINE */}
              <div
                className={`
                  absolute
                  inset-x-0
                  top-0
                  h-1
                  bg-gradient-to-r
                  ${item.color}
                `}
              />

              {/* BG SHAPE */}
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  w-36
                  h-36
                  rounded-full
                  bg-slate-100
                  opacity-40
                  transition-all
                  duration-700
                  group-hover:scale-125
                "
              />

              <div className="relative z-10">

                {/* HEADER */}
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div>

                    <p
                      className="
                        text-[11px]
                        uppercase
                        tracking-[3px]
                        text-slate-400
                        font-semibold
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-bold
                        text-slate-800
                        mt-4
                      "
                    >
                      {item.value}
                    </h2>

                  </div>

                  {/* ICON */}
                  <div
                    className={`
                      relative
                      w-14
                      h-14
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-500
                      group-hover:rotate-6
                      group-hover:scale-110
                      ${item.bg}
                    `}
                  >

                    <item.icon size={22} />

                  </div>

                </div>

                {/* FOOTER */}
                <div
                  className="
                    mt-6
                    pt-4
                    border-t
                    border-dashed
                    border-slate-200
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <div
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-emerald-500
                        animate-pulse
                      "
                    />

                    <span
                      className="
                        text-xs
                        text-slate-500
                        font-medium
                      "
                    >
                      Updated now
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-sm
                      font-semibold
                      text-emerald-600
                    "
                  >

                    {item.growth}

                    <ArrowUpRight size={16} />

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* CHARTS */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-5
           min-w-0
        "
      >

        {/* LINE CHART */}
        <div
          className="
            rounded-[30px]
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
          "
        >

          <div className="mb-5">

            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                text-slate-400
                font-semibold
              "
            >
              analytics
            </p>

            <h3
              className="
                text-xl
                font-bold
                text-slate-800
                mt-2
              "
            >
              Monthly Growth
            </h3>

          </div>

          <div className="w-full min-w-0">
            <LineChartComponent data={lineData} />
          </div>

        </div>

        {/* PIE CHART */}
        <div
          className="
            rounded-[30px]
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
          "
        >

          <div className="mb-5">

            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                text-slate-400
                font-semibold
              "
            >
              approvals
            </p>

            <h3
              className="
                text-xl
                font-bold
                text-slate-800
                mt-2
              "
            >
              Leave Overview
            </h3>

          </div>

          <div className="overflow-x-auto">
            <PieChartComponent data={pieData} />
          </div>

        </div>

      </div>

      {/* EMPLOYEE LIST */}
      <div
        className="
          rounded-[30px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-6
          "
        >

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                text-slate-400
                font-semibold
              "
            >
              workforce
            </p>

            <h3
              className="
                text-2xl
                font-bold
                text-slate-800
                mt-2
              "
            >
              Employee Activity
            </h3>

          </div>

          <button
            className="
              px-4
              py-2
              rounded-2xl
              bg-indigo-50
              border
              border-indigo-200
              text-indigo-600
              text-sm
              font-semibold
              hover:bg-indigo-100
              transition-all
              w-fit
            "
          >
            View All
          </button>

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {employees.map((emp, i) => (
            <div
              key={i}
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-slate-50/70
                p-4
                hover:bg-white
                hover:shadow-sm
                transition-all
              "
            >

              {/* LEFT */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                {/* AVATAR */}
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-600
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                    shadow-md
                    flex-shrink-0
                  "
                >
                  {emp.name.charAt(0).toUpperCase()}
                </div>

                {/* INFO */}
                <div>

                  <h4
                    className="
                      text-base
                      font-semibold
                      text-slate-800
                      capitalize
                    "
                  >
                    {emp.name}
                  </h4>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      capitalize
                      mt-1
                    "
                  >
                    {emp.role}
                  </p>

                </div>

              </div>

              {/* STATUS */}
              <span
                className={`
                  px-3
                  py-1.5
                  rounded-xl
                  text-xs
                  font-semibold
                  capitalize
                  w-fit
                  ${
                    emp.status === "active"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : emp.status === "on leave"
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-rose-100 text-rose-700 border border-rose-200"
                  }
                `}
              >
                {emp.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}