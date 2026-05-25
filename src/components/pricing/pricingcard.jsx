import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingCard({
  plan,
  price,
  description,
  features,
  popular,
  buttonText,
  onSelect,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border
        bg-white
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:shadow-2xl

        ${
          popular
            ? "border-indigo-500 ring-4 ring-indigo-100"
            : "border-slate-200"
        }
      `}
    >
      {/* POPULAR BADGE */}

      {popular && (
        <div
          className="
            absolute
            right-5
            top-5
            rounded-full
            bg-indigo-600
            px-4
            py-1.5
            text-xs
            font-semibold
            text-white
            shadow-lg
          "
        >
          Most Popular
        </div>
      )}

      {/* HEADER */}

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {plan}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      {/* PRICE */}

      <div className="mt-8 flex items-end gap-2">
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          ₹{price}
        </h1>

        <span className="mb-1 text-slate-500">
          /month
        </span>
      </div>

      {/* FEATURES */}

      <div className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <div
              className="
                mt-0.5
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-emerald-100
              "
            >
              <Check
                size={12}
                className="text-emerald-600"
              />
            </div>

            <p className="text-sm text-slate-600">
              {feature}
            </p>
          </div>
        ))}
      </div>

      {/* BUTTON */}

      <button
        onClick={onSelect}
        className={`
          mt-10
          w-full
          rounded-2xl
          px-5
          py-4
          text-sm
          font-semibold
          transition-all
          duration-300

          ${
            popular
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }
        `}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}