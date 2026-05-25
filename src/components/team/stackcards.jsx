import { useEffect, useState } from "react";
import TeamCard from "./teamcard";
import TeamDetails from "./teamdetails";
import teamdata from "./teamdata";

export default function StackCards() {
  const [active, setactive] = useState(0);

  const handlescroll = (e) => {
    if (e.deltaY > 0) {
      setactive((prev) =>
        prev === teamdata.length - 1 ? 0 : prev + 1
      );
    } else {
      setactive((prev) =>
        prev === 0 ? teamdata.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handlescroll);

    return () => {
      window.removeEventListener("wheel", handlescroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-[500px] w-full items-center justify-center overflow-hidden"
        style={{
          perspective: "1600px",
        }}
      >
        {teamdata.map((member, index) => {
          const offset =
            (index - active + teamdata.length) %
            teamdata.length;

          return (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              offset={offset}
              active={active}
              setactive={setactive}
            />
          );
        })}
      </div>

      <TeamDetails member={teamdata[active]} />
    </div>
  );
}