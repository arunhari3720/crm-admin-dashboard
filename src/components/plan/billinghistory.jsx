const history = [
  {
    id: "#INV001",
    amount: "₹999",
    date: "12 May 2026",
    status: "Paid",
  },
  {
    id: "#INV002",
    amount: "₹1999",
    date: "10 Apr 2026",
    status: "Paid",
  },
  {
    id: "#INV003",
    amount: "₹499",
    date: "18 Mar 2026",
    status: "Pending",
  },
];

export default function BillingHistory() {
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
          Billing History
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View all previous subscription transactions.
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
                Invoice
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
                Amount
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr
                key={index}
                className="
                  border-t
                  border-slate-100
                  transition-all
                  hover:bg-slate-50
                "
              >
                <td className="px-6 py-5 font-semibold text-slate-700">
                  {item.id}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {item.amount}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {item.date}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`
                      rounded-full
                      px-4
                      py-1.5
                      text-xs
                      font-semibold

                      ${
                        item.status ===
                        "Paid"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {item.status}
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