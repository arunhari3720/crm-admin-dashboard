import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#F59E0B", "#EF4444"];

export default function PieChartComponent({ data = [] })
 {  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div
      className="
        w-full
        min-w-0
        bg-white/80
        backdrop-blur
        p-4
        sm:p-6
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-lg
        transition
      "
    >

      <h3 className="text-slate-700 text-sm font-medium mb-3 sm:mb-4">
        leave distribution
      </h3>

      <div className="w-full min-w-0 h-[300px]">

        <ResponsiveContainer width="99%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs sm:text-sm">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  COLORS[i % COLORS.length],
              }}
            />

            <span className="text-slate-600 capitalize">
              {item.name}
            </span>

          </div>
        ))}
      </div>

    </div>
  );
}