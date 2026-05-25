const plans = [
  {
    id: 1,

    name: "Free",

    price: 0,

    yearlyPrice: 0,

    description:
      "Perfect for getting started with basic features.",

    popular: false,

    features: [
      "1 Workspace",
      "Basic Analytics",
      "Limited Storage",
      "Community Support",
      "Up to 3 Team Members",
    ],
  },

  {
    id: 2,

    name: "Pro",

    price: 999,

    yearlyPrice: 9999,

    description:
      "Advanced tools designed for growing teams and businesses.",

    popular: true,

    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "Priority Support",
      "AI Insights",
      "Custom Branding",
      "Unlimited Team Members",
    ],
  },

  {
    id: 3,

    name: "Enterprise",

    price: 2999,

    yearlyPrice: 29999,

    description:
      "Complete enterprise solution with maximum performance.",

    popular: false,

    features: [
      "Dedicated Account Manager",
      "Custom API Access",
      "Enterprise Security",
      "Unlimited Storage",
      "Advanced Permissions",
      "24/7 Premium Support",
    ],
  },
];

export default plans;