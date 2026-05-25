import CurrentPlanCard from "../../components/plan/currentplancard";
import UsageProgress from "../../components/plan/usageprogress";
import RenewalCard from "../../components/plan/renewalcard";
import BillingHistory from "../../components/plan/billinghistory";

import { usePlan } from "../../context/plancontext";

export default function CurrentPlanPage() {
  const { currentPlan } =
    usePlan();

  return (
    <div className="space-y-6">
      {/* PLAN CARD */}

      <CurrentPlanCard
        currentPlan={
          currentPlan
        }
      />

      {/* GRID */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        <UsageProgress />

        <RenewalCard
          currentPlan={
            currentPlan
          }
        />
      </div>

      {/* HISTORY */}

      <BillingHistory />
    </div>
  );
}