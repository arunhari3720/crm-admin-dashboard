import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  {
    id: 0,
    value: 400,
    label: "Free",
    color: "#cbd5e1",
  },

  {
    id: 1,
    value: 300,
    label: "Pro",
    color: "#6366f1",
  },

  {
    id: 2,
    value: 200,
    label: "Enterprise",
    color: "#14b8a6",
  },
];

export default function SubscriptionChart() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Subscription Plans
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Active user distribution
        </p>
      </div>

      {/* CHART */}

      <div className="flex justify-center overflow-x-auto">
        <PieChart
          series={[
            {
              data,
              innerRadius: 70,
              outerRadius: 110,
              paddingAngle: 4,
              cornerRadius: 6,
            },
          ]}
          width={320}
          height={320}
        />
      </div>

      {/* LEGENDS */}

      <div className="mt-6 space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    item.color,
                }}
              />

              <span className="text-sm font-medium text-slate-600">
                {item.label}
              </span>
            </div>

            <span className="text-sm font-bold text-slate-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}