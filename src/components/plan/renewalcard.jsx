import {
  CalendarClock,
  ShieldCheck,
} from "lucide-react";

export default function RenewalCard({
  currentPlan,
}) {
  if (!currentPlan) {
    return null;
  }

  return (
    <div
      className="
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm
      "
    >
      <div className="flex items-start gap-5">
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-indigo-100
          "
        >
          <CalendarClock className="h-8 w-8 text-indigo-600" />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">
            Upcoming Renewal
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your subscription renews automatically on the scheduled renewal date.
          </p>

          <div
            className="
              mt-6
              rounded-2xl
              bg-slate-50
              p-5
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Renewal Date
                </p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {new Date(
                    currentPlan.renewalDate
                  ).toLocaleDateString()}
                </h3>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-emerald-100
                  px-4
                  py-2
                "
              >
                <p className="text-sm font-semibold text-emerald-600">
                  Auto Renew Enabled
                </p>
              </div>
            </div>
          </div>

          {/* SECURITY */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              rounded-2xl
              bg-indigo-50
              p-4
            "
          >
            <ShieldCheck className="h-5 w-5 text-indigo-600" />

            <p className="text-sm text-slate-600">
              Secure recurring billing enabled for uninterrupted service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}