export default function FunnelStats() {
  const stats = [
    {
      title: "Visitors",
      value: "48K",
      color: "bg-slate-800",
    },

    {
      title: "Pricing Visits",
      value: "18K",
      color: "bg-blue-600",
    },

    {
      title: "Checkout Started",
      value: "8.4K",
      color: "bg-indigo-600",
    },

    {
      title: "Successful Payments",
      value: "5.2K",
      color: "bg-emerald-500",
    },
  ];

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
          Conversion Funnel
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          User subscription conversion journey
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {stats.map((item, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                {item.title}
              </span>

              <span className="text-sm font-bold text-slate-800">
                {item.value}
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`
                  h-full
                  rounded-full
                  ${item.color}
                `}
                style={{
                  width: `${
                    100 - index * 20
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}