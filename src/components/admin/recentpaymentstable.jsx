const payments = [
  {
    name: "Harry",
    plan: "Pro",
    amount: "$29",
    status: "Paid",
  },
  {
    name: "John",
    plan: "Enterprise",
    amount: "$99",
    status: "Paid",
  },
  {
    name: "David",
    plan: "Pro",
    amount: "$29",
    status: "Pending",
  },
];

export default function RecentPaymentsTable() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Payments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest subscription activities
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Plan
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={index}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium text-slate-700">
                  {payment.name}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {payment.plan}
                </td>

                <td className="px-6 py-5 font-semibold text-slate-800">
                  {payment.amount}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${
                        payment.status === "Paid"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}