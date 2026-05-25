import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition min-w-0">
      
      <h3 className="text-slate-700 text-sm font-medium mb-4">
        Project Revenue
      </h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <Tooltip />

            <Bar
              dataKey="revenue"
              radius={[10, 10, 0, 0]}
              fill="#6366F1"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}