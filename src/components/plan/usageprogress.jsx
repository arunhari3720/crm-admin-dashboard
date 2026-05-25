export default function UsageProgress() {
  const usages = [
    {
      label: "Projects",
      used: 18,
      total: 25,
    },
    {
      label: "Team Members",
      used: 12,
      total: 20,
    },
    {
      label: "Storage",
      used: 65,
      total: 100,
    },
  ];

  return (
    <div
      className="
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm
      "
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Usage Overview
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Monitor your current subscription usage.
        </p>
      </div>

      <div className="mt-8 space-y-7">
        {usages.map((item, index) => {
          const percentage =
            (item.used / item.total) *
            100;

          return (
            <div key={index}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">
                  {item.label}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.used}/{item.total}
                </p>
              </div>

              <div
                className="
                  mt-3
                  h-3
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                "
              >
                <div
                  style={{
                    width: `${percentage}%`,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-500
                    to-blue-500
                    transition-all
                    duration-500
                  "
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}