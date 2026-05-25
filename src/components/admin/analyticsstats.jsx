export default function AnalyticsStats() {
  const stats = [
    {
      title: "Conversion Rate",
      value: "68%",
      growth: "+12%",
    },

    {
      title: "Retention Rate",
      value: "84%",
      growth: "+8%",
    },

    {
      title: "Refund Rate",
      value: "1.2%",
      growth: "-2%",
    },

    {
      title: "Churn Rate",
      value: "4.1%",
      growth: "-1.8%",
    },
  ];

  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((item, index) => (
        <div
          key={index}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-slate-500">
            {item.title}
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-800">
            {item.value}
          </h2>

          <div
            className={`
              mt-4
              inline-flex
              rounded-full
              px-3
              py-1
              text-xs
              font-bold

              ${
                item.growth.includes("-")
                  ? "bg-red-100 text-red-600"
                  : "bg-emerald-100 text-emerald-600"
              }
            `}
          >
            {item.growth}
          </div>
        </div>
      ))}
    </div>
  );
}