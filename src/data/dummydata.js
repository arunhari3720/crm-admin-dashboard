// 👤 EMPLOYEES LIST

export const employees = [
  {
    name: "john",
    role: "developer",
    team: "alpha",
    status: "active",
  },
  {
    name: "sara",
    role: "hr",
    team: "beta",
    status: "on leave",
  },
  {
    name: "alex",
    role: "manager",
    team: "gamma",
    status: "active",
  },
];
// 👥 TEAMS DATA (SEPARATE)
export const teams = [
  {
    name: "hr",
    lead: "sara",
    color: "from-pink-500 to-rose-500",
    members: [
      { name: "sara", role: "lead", level: "senior" },
      { name: "john", role: "recruiter", level: "junior" },
    ],
  },
  {
    name: "tech",
    lead: "alex",
    color: "from-indigo-500 to-blue-500",
    members: [
      { name: "alex", role: "lead", level: "senior" },
      { name: "mike", role: "developer", level: "senior" },
      { name: "lisa", role: "developer", level: "junior" },
    ],
  },
  {
    name: "marketing",
    lead: "emma",
    color: "from-green-500 to-emerald-500",
    members: [
      { name: "emma", role: "lead", level: "senior" },
      { name: "noah", role: "seo", level: "junior" },
    ],
  },
  {
    name: "bde",
    lead: "liam",
    color: "from-yellow-500 to-orange-500",
    members: [
      { name: "liam", role: "lead", level: "senior" },
      { name: "oliver", role: "sales", level: "junior" },
    ],
  },
  {
    name: "design",
    lead: "ava",
    color: "from-purple-500 to-pink-500",
    members: [
      { name: "ava", role: "lead", level: "senior" },
      { name: "mia", role: "ui designer", level: "junior" },
    ],
  },
];