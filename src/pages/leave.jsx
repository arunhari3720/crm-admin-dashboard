const leaveRequests = [
  { name: "john", type: "casual", date: "12 aug", status: "pending" },
  { name: "sara", type: "sick",   date: "10 aug", status: "approved" },
  { name: "alex", type: "annual", date: "08 aug", status: "rejected" },
];

const statusConfig = {
  pending:  { pill: "bg-amber-50 text-amber-700 border border-amber-200",  border: "border-l-amber-400" },
  approved: { pill: "bg-green-50 text-green-700 border border-green-200",  border: "border-l-green-500" },
  rejected: { pill: "bg-red-50 text-red-600 border border-red-200",        border: "border-l-rose-500"  },
};

const avatarConfig = {
  john: "bg-violet-50 text-violet-600",
  sara: "bg-pink-50 text-pink-600",
  alex: "bg-sky-50 text-sky-600",
};

export default function Leave() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
            Leave Requests
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Review and manage employee leave
          </p>
        </div>

        {/* BADGES */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Pending 1
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            Approved 1
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
            Rejected 1
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {leaveRequests.map((req, i) => {
          const sc = statusConfig[req.status];
          const av = avatarConfig[req.name];

          return (
            <div
              key={i}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100 border-l-[3px] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${sc.border}`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* AVATAR */}
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm font-black ${av}`}>
                  {req.name.charAt(0).toUpperCase()}
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-sm font-bold text-slate-900 capitalize">
                    {req.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium capitalize">
                    {req.type} · {req.date}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">

                {/* STATUS */}
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full capitalize ${sc.pill}`}>
                  {req.status}
                </span>

                {/* ACTIONS */}
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="w-7 h-7 rounded-lg bg-green-50 text-green-600 border border-green-200 flex items-center justify-center hover:bg-green-100 transition">
                      ✔
                    </button>

                    <button className="w-7 h-7 rounded-lg bg-red-50 text-red-500 border border-red-200 flex items-center justify-center hover:bg-red-100 transition">
                      ✕
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}