export default function Tickets() {
  const tickets = [
    { title: "salary issue", user: "john", status: "open", priority: "high" },
    { title: "leave request delay", user: "sara", status: "in progress", priority: "medium" },
    { title: "system login bug", user: "alex", status: "resolved", priority: "low" },
  ];

  const statusConfig = {
    open:        { pill: "bg-red-50 text-red-600 border border-red-200", top: "border-t-rose-500", icon: "text-rose-500", iconBg: "bg-red-50 border-red-200" },
    "in progress":{ pill: "bg-amber-50 text-amber-700 border border-amber-200", top: "border-t-amber-400", icon: "text-amber-500", iconBg: "bg-amber-50 border-amber-200" },
    resolved:    { pill: "bg-green-50 text-green-700 border border-green-200", top: "border-t-green-500", icon: "text-green-500", iconBg: "bg-green-50 border-green-200" },
  };

  const priorityConfig = {
    high:   { pill: "bg-red-50 text-red-600 border border-red-200", label: "High Priority" },
    medium: { pill: "bg-amber-50 text-amber-700 border border-amber-200", label: "Medium Priority" },
    low:    { pill: "bg-green-50 text-green-700 border border-green-200", label: "Low Priority" },
  };

  const avatarConfig = {
    john: "bg-violet-50 text-violet-600",
    sara: "bg-pink-50 text-pink-600",
    alex: "bg-sky-50 text-sky-600",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Tickets
            </h2>

            {/* BADGES */}
            <span className="text-[10px] sm:text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-full">
              1 Open
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full">
              1 In Progress
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full">
              1 Resolved
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Manage and track support tickets
          </p>
        </div>

        {/* BUTTON */}
        <button className="flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl hover:opacity-90 transition shadow-sm w-full sm:w-auto">
          + Create Ticket
        </button>
      </div>

      {/* TICKETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {tickets.map((t, i) => {
          const sc = statusConfig[t.status];
          const pc = priorityConfig[t.priority];
          const av = avatarConfig[t.user];

          return (
            <div
              key={i}
              className={`bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-t-[3px] ${sc.top}`}
            >
              {/* ICON + PRIORITY */}
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${sc.iconBg} ${sc.icon}`}>
                  ●
                </div>

                <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full ${pc.pill}`}>
                  {pc.label}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="font-bold text-slate-900 capitalize text-sm sm:text-[15px] mb-1">
                {t.title}
              </h3>

              {/* USER */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] font-black ${av}`}>
                  {t.user.slice(0, 2).toUpperCase()}
                </div>

                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Raised by <span className="text-slate-700 font-semibold capitalize">{t.user}</span>
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full capitalize ${sc.pill}`}>
                  {t.status}
                </span>

                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300">
                  #{String(i + 1).padStart(3, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}