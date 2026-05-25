import { LineChart } from "@mui/x-charts/LineChart";

const revenueData = [
  64000,
  72000,
  81000,
  90000,
  102000,
];

const months = [
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ForecastChart() {
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
            Revenue Forecast
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Predicted future revenue analytics
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-indigo-100
            px-3
            py-1
            text-xs
            font-bold
            text-indigo-600
          "
        >
          AI Forecast
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
              data: revenueData,
              area: true,
              color: "#1d9b2c",
              curve: "natural",
            },
          ]}
          height={320}
        />
      </div>
    </div>
  );
}