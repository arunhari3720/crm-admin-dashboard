import AnalyticsStats from "../../components/admin/analyticsstats";

import GrowthChart from "../../components/admin/growthchart";

import ForecastChart from "../../components/admin/forecastchart";

import FunnelStats from "../../components/admin/funnelstats";

import ActivityHeatmap from "../../components/admin/activityheatmap";

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* STATS */}

      <AnalyticsStats />

      {/* CHARTS */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        <GrowthChart />

        <ForecastChart />
      </div>

      {/* FUNNEL */}

      <FunnelStats />

      {/* HEATMAP */}

      <ActivityHeatmap />
    </div>
  );
}