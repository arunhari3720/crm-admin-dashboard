import { motion } from "framer-motion";

export default function PricingToggle({
  yearly,
  setYearly,
}) {
  return (
    <div
      className="
        inline-flex
        items-center
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-1.5
        shadow-sm
      "
    >
      {/* MONTHLY */}

      <button
        onClick={() => setYearly(false)}
        className="
          relative
          px-6
          py-2.5
          text-sm
          font-semibold
          rounded-xl
          transition-all
        "
      >
        {!yearly && (
          <motion.div
            layoutId="togglebg"
            className="
              absolute
              inset-0
              rounded-xl
              bg-indigo-600
            "
          />
        )}

        <span
          className={`
            relative
            z-10

            ${
              yearly
                ? "text-slate-600"
                : "text-white"
            }
          `}
        >
          Monthly
        </span>
      </button>

      {/* YEARLY */}

      <button
        onClick={() => setYearly(true)}
        className="
          relative
          px-6
          py-2.5
          text-sm
          font-semibold
          rounded-xl
          transition-all
        "
      >
        {yearly && (
          <motion.div
            layoutId="togglebg"
            className="
              absolute
              inset-0
              rounded-xl
              bg-indigo-600
            "
          />
        )}

        <span
          className={`
            relative
            z-10

            ${
              yearly
                ? "text-white"
                : "text-slate-600"
            }
          `}
        >
          Yearly
        </span>
      </button>
    </div>
  );
}