import { useState } from "react";
import { teams } from "../data/dummydata";

const roleStyles = {
  lead: "bg-purple-100 text-purple-700 border border-purple-200",

  developer: "bg-blue-100 text-blue-700 border border-blue-200",

  hr: "bg-pink-100 text-pink-700 border border-pink-200",

  recruiter: "bg-pink-100 text-pink-700 border border-pink-200",

  manager: "bg-indigo-100 text-indigo-700 border border-indigo-200",

  designer: "bg-orange-100 text-orange-700 border border-orange-200",

  "ui designer": "bg-orange-100 text-orange-700 border border-orange-200",

  sales: "bg-yellow-100 text-yellow-700 border border-yellow-200",

  seo: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function Employees() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">
            Employee Management
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            Team Workspace
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Manage departments and monitor employee teams.
          </p>
        </div>

        {/* STATS */}
        <div className="flex gap-4 flex-wrap">
          <div className="min-w-[170px] rounded-2xl bg-white border border-slate-200 shadow-sm px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Total Teams
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {teams.length}
            </h2>
          </div>

          <div className="min-w-[170px] rounded-2xl bg-white border border-slate-200 shadow-sm px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Employees
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {teams.reduce((acc, curr) => acc + curr.members.length, 0)}
            </h2>
          </div>
        </div>
      </div>

      {/* TEAM CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {teams.map((team, i) => {
          const isActive = selectedTeam?.name === team.name;

          return (
            <div
              key={i}
              onClick={() => setSelectedTeam(isActive ? null : team)}
              className={`
                cursor-pointer
                rounded-3xl
                overflow-hidden
                border
                bg-white/90
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:shadow-[0_12px_30px_rgba(99,102,241,0.12)]
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                ${
                  isActive
                    ? "border-indigo-400 ring-4 ring-indigo-100"
                    : "border-slate-200 hover:border-indigo-200"
                }
              `}
            >
              {/* TOP SECTION */}
              <div
                className={`
                  relative
                  bg-gradient-to-br
                  ${team.color}
                  p-5
                `}
              >
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative flex items-center gap-4">
                  {/* AVATAR */}
                  <div
                    className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/20
                    backdrop-blur-md
                    border
                    border-white/30
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                  >
                    <span className="font-bold text-white text-lg capitalize">
                      {team.lead.charAt(0)}
                    </span>
                  </div>

                  {/* INFO */}
                  <div>
                    <p className="text-[11px] uppercase tracking-[3px] text-white/70">
                      Team Lead
                    </p>

                    <h2 className="font-semibold text-white text-lg capitalize mt-1">
                      {team.lead}
                    </h2>
                  </div>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      Department
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 capitalize mt-1">
                      {team.name}
                    </h3>
                  </div>

                  <div
                    className="
                    px-3
                    py-1
                    rounded-xl
                    bg-slate-100
                    text-slate-600
                    text-xs
                    font-medium
                  "
                  >
                    {team.members.length}
                  </div>
                </div>

                {/* AVATARS */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member, index) => (
                      <div
                        key={index}
                        className={`
                            w-9
                            h-9
                            rounded-full
                            border-2
                            border-white
                            bg-gradient-to-br
                            ${team.color}
                            flex
                            items-center
                            justify-center
                            text-white
                            text-xs
                            font-semibold
                            shadow-sm
                          `}
                      >
                        {member.name.charAt(0)}
                      </div>
                    ))}
                  </div>

                  <span
                    className="
                    text-sm
                    font-medium
                    text-indigo-600
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                  "
                  >
                    {isActive ? "Close ↑" : "View →"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MEMBERS PANEL */}
      {selectedTeam && (
        <div
          className="
          rounded-3xl
          bg-white
          border
          border-slate-200
          overflow-hidden
          shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        "
        >
          {/* TOP BORDER */}
          <div className={`h-1.5 bg-gradient-to-r ${selectedTeam.color}`} />

          {/* PANEL HEADER */}
          <div
            className="
            px-6
            py-5
            border-b
            border-slate-100
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
          "
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Active Team
              </p>

              <h2 className="text-2xl font-bold text-slate-800 capitalize mt-1">
                {selectedTeam.name} Department
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {selectedTeam.members.length} employees assigned
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedTeam(null)}
              className="
                px-4
                py-2
                rounded-xl
                bg-red-50
                border
                border-red-200
                text-red-500
                text-sm
                font-medium
                hover:bg-red-100
                transition-all
              "
            >
              Close ✕
            </button>
          </div>

          {/* MEMBERS */}
          <div
            className="
            p-6
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
          >
            {selectedTeam.members.map((member, i) => (
              <div
                key={i}
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-gradient-to-br
                  from-white
                  to-slate-50
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                "
              >
                {/* TOP */}
                <div className="flex items-center gap-4">
                  {/* AVATAR */}
                  <div
                    className={`
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-br
                      ${selectedTeam.color}
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      text-white
                      font-bold
                      text-lg
                      flex-shrink-0
                    `}
                  >
                    {member.name.charAt(0)}
                  </div>

                  {/* INFO */}
                  <div className="min-w-0">
                    <h3
                      className="
                      font-semibold
                      text-slate-800
                      text-base
                      capitalize
                      truncate
                    "
                    >
                      {member.name}
                    </h3>

                    <p
                      className="
                      text-sm
                      text-slate-500
                      capitalize
                      mt-1
                    "
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div
                  className="
                  my-5
                  border-t
                  border-dashed
                  border-slate-200
                "
                />

                {/* BADGES */}
                <div
                  className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
                >
                  {/* LEVEL */}
                  <span
                    className={`
                      px-3
                      py-1.5
                      rounded-xl
                      text-xs
                      font-semibold
                      capitalize
                      ${
                        member.level === "senior"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }
                    `}
                  >
                    {member.level}
                  </span>

                  {/* ROLE */}
                  <span
                    className={`
                      px-3
                      py-1.5
                      rounded-xl
                      text-xs
                      font-semibold
                      capitalize
                      ${
                        roleStyles[member.role] ||
                        "bg-slate-100 text-slate-600 border border-slate-200"
                      }
                    `}
                  >
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
