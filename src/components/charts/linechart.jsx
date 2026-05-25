import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineChartComponent({ data = [] }) {
  const [mounted, setMounted] = useState(false);

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
        p-6
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-lg
        transition
      "
    >

      <h3 className="text-slate-700 text-sm font-medium mb-4">
        performance overview
      </h3>

      <div className="w-full min-w-0 h-[300px]">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart data={data}>
            
            <defs>
              <linearGradient
                id="wave"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366F1"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#6366F1"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
            />

            <Tooltip />

            <Area
              type="natural"
              dataKey="value"
              stroke="#6366F1"
              fill="url(#wave)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}