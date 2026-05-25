import reports from "../../assets/reports.png";
import analytics from "../../assets/analyatics.png";
import search from "../../assets/search.png";
import suggestions from "../../assets/suggestion.png";
import attendance from "../../assets/autoattendance.png";

const aidata = [
  {
    id: 1,
    type: "reports",
    title: "AI Reports",
    description: "Generate smart reports instantly.",
    image: reports,
    color: "from-purple-500 to-pink-500",
  },

  {
    id: 2,
    type: "analytics",
    title: "AI Analytics",
    description: "Realtime business intelligence insights.",
    image: analytics,
    color: "from-cyan-500 to-blue-500",
  },

  {
    id: 3,
    type: "search",
    title: "Smart Search",
    description: "Search CRM data instantly using AI.",
    image: search,
    color: "from-orange-500 to-yellow-400",
  },

  {
    id: 4,
    type: "suggestions",
    title: "AI Suggestions",
    description: "Get smart productivity recommendations.",
    image: suggestions,
    color: "from-emerald-500 to-lime-400",
  },

  {
    id: 5,
    type: "attendance",
    title: "Auto Attendance",
    description: "Track attendance with realtime AI insights.",
    image: attendance,
    color: "from-indigo-500 to-violet-500",
  },
];

export default aidata;