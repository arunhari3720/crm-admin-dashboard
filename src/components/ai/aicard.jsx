import { motion } from "framer-motion";

export default function AICard({
  item,
  active,
  setactive,
  index,
  children,
}) {
  return (
    <motion.div
      onMouseEnter={() => setactive(index)}
      whileHover={{
        scale: 1.03,
        rotateX: 3,
        rotateY: -3,
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/40
        bg-white/60
        backdrop-blur-2xl
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}
      />

      {/* Blob */}
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-3xl`}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Active Border */}
      {active === index && (
        <motion.div
          layoutId="active-card"
          className="absolute inset-0 rounded-[32px] border-2 border-white/80"
        />
      )}
    </motion.div>
  );
}