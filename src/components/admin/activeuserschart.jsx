import { BarChart } from "@mui/x-charts/BarChart";

const users = [
  1200,
  1800,
  2400,
  2100,
  3200,
  2800,
  3900,
];

const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function ActiveUsersChart() {
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
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Active Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Weekly active user analytics
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-bold
            text-blue-600
          "
        >
          +24%
        </div>
      </div>

      {/* CHART */}

      <div className="mt-6 overflow-x-auto">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: days,
            },
          ]}
          series={[
            {
              data: users,
              color: "#2563eb",
            },
          ]}
          height={320}
          borderRadius={10}
        />
      </div>
    </div>
  );
}