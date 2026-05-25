import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        mb-8
        flex
        flex-col
        gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}

      <div>
        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            text-slate-900
            sm:text-4xl
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
            sm:text-base
          "
        >
          {subtitle}
        </p>
      </div>

      {/* RIGHT */}

      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </motion.div>
  );
}