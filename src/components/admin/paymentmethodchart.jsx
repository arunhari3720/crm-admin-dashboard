const methods = [
  {
    label: "UPI",
    percentage: "72%",
    width: "72%",
    color: "bg-blue-600",
  },

  {
    label: "Cards",
    percentage: "54%",
    width: "54%",
    color: "bg-indigo-600",
  },

  {
    label: "Wallet",
    percentage: "31%",
    width: "31%",
    color: "bg-emerald-500",
  },

  {
    label: "Net Banking",
    percentage: "18%",
    width: "18%",
    color: "bg-orange-500",
  },
];

export default function PaymentMethodChart() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Payment Methods
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Most used payment methods
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {methods.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">
                {item.label}
              </h3>

              <span className="text-sm font-bold text-slate-800">
                {item.percentage}
              </span>
            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`
                  h-full
                  rounded-full
                  ${item.color}
                `}
                style={{
                  width: item.width,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}