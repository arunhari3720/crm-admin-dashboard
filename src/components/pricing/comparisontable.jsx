import {
  Check,
  Minus,
} from "lucide-react";

const comparisonData = [
  {
    feature: "Unlimited Projects",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Advanced Analytics",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Priority Support",
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: "Custom Branding",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "AI Insights",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Dedicated Manager",
    free: false,
    pro: false,
    enterprise: true,
  },
];

export default function ComparisonTable() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* HEADER */}

      <div className="border-b border-slate-100 p-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Compare Plans
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Explore features included in each subscription plan.
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
                Features
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-slate-600">
                Free
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-indigo-600">
                Pro
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-slate-600">
                Enterprise
              </th>
            </tr>
          </thead>

          <tbody>
            {comparisonData.map((item, index) => (
              <tr
                key={index}
                className="
                  border-t
                  border-slate-100
                  transition-all
                  hover:bg-slate-50
                "
              >
                <td className="px-6 py-5 text-sm font-medium text-slate-700">
                  {item.feature}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    {item.free ? (
                      <Check className="text-emerald-600" />
                    ) : (
                      <Minus className="text-slate-300" />
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    {item.pro ? (
                      <Check className="text-indigo-600" />
                    ) : (
                      <Minus className="text-slate-300" />
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    {item.enterprise ? (
                      <Check className="text-emerald-600" />
                    ) : (
                      <Minus className="text-slate-300" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}