import { LineChart } from "@mui/x-charts";

const data = [
  12000,
  18000,
  26000,
  34000,
  42000,
  56000,
  72000,
];

export default function RevenueChart() {
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Revenue Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Subscription revenue growth overview
          </p>
        </div>

        <div className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-600">
          +18%
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
              ],
            },
          ]}
          series={[
            {
              data,
              area: true,
              color: "#2563eb",
              curve: "natural",
            },
          ]}
          height={350}
        />
      </div>
    </div>
  );
}