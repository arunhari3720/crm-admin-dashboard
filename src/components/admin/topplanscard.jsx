const plans = [
  {
    name: "Pro Plan",
    users: "1,240 Users",
    growth: "+12%",
  },
  {
    name: "Enterprise",
    users: "840 Users",
    growth: "+8%",
  },
  {
    name: "Free Plan",
    users: "5,430 Users",
    growth: "+24%",
  },
];

export default function TopPlansCard() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Top Plans
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Most subscribed plans
        </p>
      </div>

      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-100
              p-4
              transition-all
              duration-300
              hover:border-indigo-200
              hover:bg-indigo-50
            "
          >
            <div>
              <h3 className="font-semibold text-slate-700">
                {plan.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {plan.users}
              </p>
            </div>

            <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-600">
              {plan.growth}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}