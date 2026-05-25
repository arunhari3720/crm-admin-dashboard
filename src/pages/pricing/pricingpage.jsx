import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PricingCard from "../../components/pricing/pricingcard";
import PricingToggle from "../../components/pricing/pricingtoggle";
import FeatureList from "../../components/pricing/featurelist";
import ComparisonTable from "../../components/pricing/comparisontable";

import plans from "../../data/plan";

export default function PricingPage() {
  const navigate = useNavigate();

  const [yearly, setYearly] =
    useState(false);

  const handleSelectPlan = (
    plan
  ) => {
    navigate("/payment", {
      state: {
        plan: {
          ...plan,
          finalPrice: yearly
            ? plan.yearlyPrice
            : plan.price,

          billingType: yearly
            ? "Yearly"
            : "Monthly",
        },
      },
    });
  };

  return (
    <div className="space-y-20">
      {/* HERO */}

      <div className="text-center">
        <div
          className="
            inline-flex
            items-center
            rounded-full
            bg-indigo-100
            px-4
            py-2
            text-sm
            font-semibold
            text-indigo-600
          "
        >
          Premium Subscription Plans
        </div>

        <h1
          className="
            mx-auto
            mt-8
            max-w-4xl
            text-4xl
            font-black
            tracking-tight
            text-slate-900
            sm:text-6xl
          "
        >
          Flexible Pricing Designed
          For Modern Businesses
        </h1>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-slate-500
          "
        >
          Choose the perfect plan to scale your workflow,
          manage subscriptions and unlock premium tools.
        </p>

        {/* TOGGLE */}

        <div className="mt-10 flex justify-center">
          <PricingToggle
            yearly={yearly}
            setYearly={setYearly}
          />
        </div>
      </div>

      {/* PRICING */}

      <div
        className="
          grid
          gap-8
          lg:grid-cols-3
        "
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan.name}
            price={
              yearly
                ? plan.yearlyPrice
                : plan.price
            }
            description={
              plan.description
            }
            features={
              plan.features
            }
            popular={plan.popular}
            buttonText="Get Started"
            onSelect={() =>
              handleSelectPlan(plan)
            }
          />
        ))}
      </div>

      {/* FEATURES */}

      <div>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-slate-900">
            Why Choose Our Platform
          </h2>

          <p className="mt-4 text-slate-500">
            Designed with premium tools for modern SaaS businesses.
          </p>
        </div>

        <FeatureList />
      </div>

      {/* COMPARISON */}

      <ComparisonTable />
    </div>
  );
}