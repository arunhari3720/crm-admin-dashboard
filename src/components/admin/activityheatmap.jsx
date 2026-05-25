const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function ActivityHeatmap() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          User Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Weekly subscription activity heatmap
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <div className="flex min-w-[650px] gap-3">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-3"
            >
              <span className="text-xs font-medium text-slate-500">
                {day}
              </span>

              {[1, 2, 3, 4, 5].map(
                (box, idx) => (
                  <div
                    key={idx}
                    className={`
                      h-10
                      w-10
                      rounded-xl

                      ${
                        idx === 0
                          ? "bg-slate-100"
                          : idx === 1
                          ? "bg-blue-100"
                          : idx === 2
                          ? "bg-blue-300"
                          : idx === 3
                          ? "bg-blue-500"
                          : "bg-indigo-700"
                      }
                    `}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}