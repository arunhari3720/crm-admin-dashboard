import { LineChart } from "@mui/x-charts/LineChart";

const growthData = [
  12,
  18,
  24,
  32,
  38,
  46,
  58,
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
];

export default function GrowthChart() {
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
            Subscription Growth
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly platform growth analytics
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-emerald-100
            px-3
            py-1
            text-xs
            font-bold
            text-emerald-600
          "
        >
          +18%
        </div>
      </div>

      {/* CHART */}

      <div className="mt-6 overflow-x-auto">
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: months,
            },
          ]}
          series={[
            {
              data: growthData,
              color: "#2563eb",
              curve: "natural",
            },
          ]}
          height={320}
        />
      </div>
    </div>
  );
}