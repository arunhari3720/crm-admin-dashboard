import { Link } from "react-router-dom";

import {
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-gradient-to-br
        from-indigo-600
        via-blue-600
        to-violet-600
        px-6
        py-20
        text-white
        shadow-2xl
        sm:px-10
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          -left-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-60
          w-60
          rounded-full
          bg-white/10
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/15
            px-4
            py-2
            backdrop-blur-lg
          "
        >
          <Sparkles className="h-4 w-4" />

          <span className="text-sm font-semibold">
            Premium SaaS Platform
          </span>
        </div>

        <h1
          className="
            mt-8
            max-w-4xl
            text-4xl
            font-black
            leading-tight
            sm:text-6xl
          "
        >
          Smart Subscription
          Management Platform
        </h1>

        <p
          className="
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-indigo-100
          "
        >
          Manage subscriptions, analytics, revenue and premium plans
          with a modern CRM experience.
        </p>

        {/* BUTTONS */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-4
          "
        >
          <Link
            to="/pricing"
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-white
              px-6
              py-4
              text-sm
              font-semibold
              text-slate-900
              transition-all
              hover:scale-[1.02]
            "
          >
            Explore Plans

            <ArrowRight size={18} />
          </Link>

          <Link
            to="/subscriptions"
            className="
              rounded-2xl
              border
              border-white/20
              bg-white/10
              px-6
              py-4
              text-sm
              font-semibold
              text-white
              backdrop-blur-lg
              transition-all
              hover:bg-white/20
            "
          >
            View Dashboard
          </Link>
        </div>

        {/* FEATURES */}

        <div
          className="
            mt-16
            grid
            gap-5
            sm:grid-cols-3
          "
        >
          <div
            className="
              rounded-3xl
              bg-white/10
              p-6
              backdrop-blur-lg
            "
          >
            <ShieldCheck className="h-8 w-8" />

            <h3 className="mt-5 text-lg font-bold">
              Secure Billing
            </h3>

            <p className="mt-2 text-sm text-indigo-100">
              Encrypted subscription management system.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white/10
              p-6
              backdrop-blur-lg
            "
          >
            <BarChart3 className="h-8 w-8" />

            <h3 className="mt-5 text-lg font-bold">
              Revenue Analytics
            </h3>

            <p className="mt-2 text-sm text-indigo-100">
              Track growth and subscription performance.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white/10
              p-6
              backdrop-blur-lg
            "
          >
            <Sparkles className="h-8 w-8" />

            <h3 className="mt-5 text-lg font-bold">
              Premium Experience
            </h3>

            <p className="mt-2 text-sm text-indigo-100">
              Designed with modern UI and smooth interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}