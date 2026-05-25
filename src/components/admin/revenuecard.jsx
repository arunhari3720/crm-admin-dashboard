import { motion } from "framer-motion";

export default function RevenueCard({
  title,
  value,
  icon: Icon,
  growth,
  bg,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-2xl
      "
    >
      <div
        className={`
          absolute
          top-0
          left-0
          h-1
          w-full
          ${bg}
        `}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">
            <span className="text-sm font-semibold text-emerald-600">
              +{growth}%
            </span>

            <span className="text-xs text-slate-500">
              vs last month
            </span>
          </div>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${bg}
            bg-opacity-10
          `}
        >
          <Icon className="h-7 w-7 text-indigo-600" />
        </div>
      </div>
    </motion.div>
  );
}