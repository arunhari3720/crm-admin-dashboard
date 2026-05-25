import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  12000,
  18000,
  26000,
  32000,
  41000,
  52000,
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

export default function RevenueBarChart() {
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
            Revenue Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly revenue performance
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
          +32%
        </div>
      </div>

      {/* CHART */}

      <div className="mt-6 overflow-x-auto">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: months,
            },
          ]}
          series={[
            {
              data,
              color: "#4f46e5",
            },
          ]}
          height={320}
          borderRadius={10}
        />
      </div>
    </div>
  );
}