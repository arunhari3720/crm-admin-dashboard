import BarChartComponent from "../components/charts/barchart";

const projects = [
  { name: "project 1", progress: 80, status: "completed", revenue: 50000 },
  { name: "project 2", progress: 60, status: "active", revenue: 30000 },
  { name: "project 3", progress: 30, status: "pending", revenue: 15000 },
];

const statusConfig = {
  completed: {
    badge: "bg-green-50 text-green-700 border border-green-200",
    bar: "from-green-400 to-green-600",
    pct: "text-green-600",
    revenue: "bg-green-50 border border-green-200 text-green-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    iconBg: "bg-green-50 border border-green-200",
  },
  active: {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    bar: "from-blue-400 to-blue-600",
    pct: "text-blue-600",
    revenue: "bg-blue-50 border border-blue-200 text-blue-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    iconBg: "bg-blue-50 border border-blue-200",
  },
  pending: {
    badge: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    bar: "from-yellow-400 to-yellow-600",
    pct: "text-yellow-600",
    revenue: "bg-yellow-50 border border-yellow-200 text-yellow-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    iconBg: "bg-yellow-50 border border-yellow-200",
  },
};

export default function Projects() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Projects Overview</h2>
          <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
            3 Active
          </span>
        </div>
        <p className="text-sm text-slate-400 font-medium">Track project progress and revenue</p>
      </div>

      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((proj, i) => {
          const cfg = statusConfig[proj.status];
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              {/* TOP */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-slate-900 capitalize text-[15px] mb-1">{proj.name}</p>
                  <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full capitalize ${cfg.badge}`}>
                    {proj.status}
                  </span>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cfg.iconBg}`}>
                  {cfg.icon}
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Progress</span>
                  <span className={`text-xs font-extrabold ${cfg.pct}`}>{proj.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${cfg.bar} transition-all duration-700`}
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>

              {/* REVENUE */}
              <div className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 ${cfg.revenue}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span className="text-sm font-bold">₹{proj.revenue.toLocaleString()}</span>
                <span className="text-[10px] font-semibold opacity-60 ml-auto">Revenue</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHART */}
      <BarChartComponent data={projects} />

    </div>
  );
}