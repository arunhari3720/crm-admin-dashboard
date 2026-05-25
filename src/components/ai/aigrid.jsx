import { useState } from "react";

import aidata from "./aidata";

import AttendanceCard from "./attendancecard";
import ReportsCard from "./reportscard";
import AnalyticsCard from "./analyticscard";
import SearchCard from "./searchcard";
import SuggestionsCard from "./suggestioncard";

import Aidetails from "./aidetail";

export default function AIGrid() {
  const [active, setactive] = useState(0);

  const rendercard = (item, index) => {
    const props = {
      item,
      index,
      active,
      setactive,
    };

    switch (item.type) {
      case "attendance":
        return <AttendanceCard {...props} />;

      case "reports":
        return <ReportsCard {...props} />;

      case "analytics":
        return <AnalyticsCard {...props} />;

      case "search":
        return <SearchCard {...props} />;

      case "suggestions":
        return <SuggestionsCard {...props} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {aidata.map((item, index) => (
          <div key={item.id}>
            {rendercard(item, index)}
          </div>
        ))}
      </div>

      <Aidetails item={aidata[active]} />
    </div>
  );
}