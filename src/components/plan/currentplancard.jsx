import {
  Crown,
  Sparkles,
} from "lucide-react";

export default function CurrentPlanCard({
  currentPlan,
}) {
  if (!currentPlan) {
    return (
      <div
        className="
          rounded-[30px]
          border
          border-dashed
          border-slate-300
          bg-white
          p-10
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-slate-100
          "
        >
          <Crown className="h-10 w-10 text-slate-400" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          No Active Plan
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Upgrade to unlock premium features and advanced tools.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-br
        from-indigo-600
        via-blue-600
        to-violet-600
        p-8
        text-white
        shadow-2xl
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          h-32
          w-32
          rounded-full
          bg-white/10
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/20
                px-4
                py-2
                backdrop-blur-lg
              "
            >
              <Sparkles className="h-4 w-4" />

              <span className="text-sm font-semibold">
                Active Subscription
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black">
              {currentPlan.name}
            </h1>

            <p className="mt-3 text-sm text-indigo-100">
              Enjoy premium access with all advanced features.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white/15
              px-6
              py-5
              backdrop-blur-lg
            "
          >
            <p className="text-sm text-indigo-100">
              Monthly Price
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹{currentPlan.price}
            </h2>
          </div>
        </div>

        {/* DETAILS */}

        <div
          className="
            mt-8
            grid
            gap-5
            sm:grid-cols-2
          "
        >
          <div
            className="
              rounded-2xl
              bg-white/10
              p-5
              backdrop-blur-lg
            "
          >
            <p className="text-sm text-indigo-100">
              Activated Date
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {new Date(
                currentPlan.activatedAt
              ).toLocaleDateString()}
            </h3>
          </div>

          <div
            className="
              rounded-2xl
              bg-white/10
              p-5
              backdrop-blur-lg
            "
          >
            <p className="text-sm text-indigo-100">
              Renewal Date
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {new Date(
                currentPlan.renewalDate
              ).toLocaleDateString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}