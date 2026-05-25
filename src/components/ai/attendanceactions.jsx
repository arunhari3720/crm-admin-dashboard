export default function AttendanceActions({
  setmessage,
  settype,
}) {
  const handleaction = (type, text) => {
    settype(type);

    setmessage(text);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        onClick={() =>
          handleaction(
            "live",
            "Fetching live attendance users..."
          )
        }
        className="
          rounded-2xl
          bg-gradient-to-r
          from-indigo-500
          to-violet-500
          px-6
          py-3
          font-semibold
          text-white
        "
      >
        Live Attendance
      </button>

      <button
        onClick={() =>
          handleaction(
            "today",
            "Fetching today's attendance..."
          )
        }
        className="
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          px-6
          py-3
          font-semibold
          text-white
        "
      >
        Today Attendance
      </button>

      <button
        onClick={() =>
          handleaction(
            "summary",
            "Generating attendance summary..."
          )
        }
        className="
          rounded-2xl
          bg-gradient-to-r
          from-emerald-500
          to-lime-500
          px-6
          py-3
          font-semibold
          text-white
        "
      >
        Attendance Summary
      </button>
    </div>
  );
}