import {
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Sparkles,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Experience ultra fast dashboard loading and analytics.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Security",
    description:
      "Enterprise-grade protection for your business data.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Track revenue, subscriptions and performance insights.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Manage your organization with role-based access.",
  },
  {
    icon: Sparkles,
    title: "Premium Experience",
    description:
      "Beautiful UI crafted for modern SaaS businesses.",
  },
  {
    icon: Clock3,
    title: "24/7 Availability",
    description:
      "Reliable cloud infrastructure with smooth uptime.",
  },
];

export default function FeatureList() {
  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {features.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-indigo-100
              "
            >
              <Icon className="h-7 w-7 text-indigo-600" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}