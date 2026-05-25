import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import RevenueCard from "../../components/admin/revenuecard";

import RevenueChart from "../../components/admin/revenuechart";

import SubscriptionChart from "../../components/admin/subscriptionchart";

import RevenueBarChart from "../../components/admin/revenuebarchart";

import PaymentMethodChart from "../../components/admin/paymentmethodchart";

import ActiveUsersChart from "../../components/admin/activeuserschart";

import RecentPaymentsTable from "../../components/admin/recentpaymentstable";

import TopPlansCard from "../../components/admin/topplanscard";

export default function SubscriptionDashboard() {
  return (
    <div className="space-y-6">
      {/* TOP CARDS */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <RevenueCard
          title="Total Revenue"
          value="₹4,82,940"
          growth="18.4"
          icon={DollarSign}
          color="bg-blue-600"
        />

        <RevenueCard
          title="Active Users"
          value="8,240"
          growth="12.8"
          icon={Users}
          color="bg-indigo-600"
        />

        <RevenueCard
          title="Subscriptions"
          value="3,920"
          growth="24.1"
          icon={CreditCard}
          color="bg-emerald-500"
        />

        <RevenueCard
          title="Growth Rate"
          value="32%"
          growth="9.4"
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* CHARTS */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-3
        "
      >
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <SubscriptionChart />
      </div>

      {/* SECOND SECTION */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <RevenueBarChart />

        <PaymentMethodChart />
      </div>

      {/* THIRD SECTION */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <ActiveUsersChart />

        <TopPlansCard />
      </div>

      {/* TABLE */}

      <RecentPaymentsTable />
    </div>
  );
}