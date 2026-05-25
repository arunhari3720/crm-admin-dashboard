import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function TeamCard({
  member,
  offset,
  active,
  setactive,
  index
}) {
  return (
    <motion.div
  onClick={() => setactive(index)}
  whileHover={{
    scale: offset === 0 ? 1.03 : 0.86,
  }}
  animate={{
    x:
      offset === 0
        ? 0
        : offset === 1
        ? 260
        : offset === 2
        ? -260
        : 0,

    scale: offset === 0 ? 1 : 0.82,

    rotate:
      offset === 0
        ? 0
        : offset === 1
        ? 12
        : -12,

    zIndex: offset === 0 ? 30 : 10,

    opacity: offset === 0 ? 1 : 0.55,

    filter:
      offset === 0
        ? "blur(0px)"
        : "blur(2px)",

    y: offset === 0 ? -10 : 40,
  }}
  transition={{
    type: "spring",
    stiffness: 180,
    damping: 18,
  }}
  className="absolute cursor-grab active:cursor-grabbing"
  style={{
    transformStyle: "preserve-3d",
  }}
>
      <div
        className={`relative w-[320px] overflow-hidden rounded-[32px] border border-white/60 bg-white p-6 shadow-2xl`}
      >
        {/* Gradient Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-10`}
        />

        {/* Top Icon */}
      {/* Profile Image */}
<div className="relative mb-6">
  {/* Glow */}
  <div
    className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${member.color} opacity-40 blur-lg`}
  />

  {/* Image */}
  <img
    src={member.image}
    alt={member.name}
    className="relative h-20 w-20 rounded-3xl object-cover border-4 border-white shadow-xl"
  />
</div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-gray-800">
          {member.name}
        </h2>

        {/* Role */}
        <p className="mt-2 text-lg font-medium text-gray-500">
          {member.role}
        </p>

        {/* Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail size={18} />
            <span>{member.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
              {member.department}
            </span>

            <span
              className={`rounded-full px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r ${member.color}`}
            >
              {member.status}
            </span>
          </div>
        </div>

        {/* Active Glow */}
        {active === index && (
          <motion.div
            layoutId="activeGlow"
            className={`absolute inset-0 rounded-[32px] border-2 border-white/80`}
          />
        )}
      </div>
    </motion.div>
  );
}