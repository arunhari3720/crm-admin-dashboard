import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventModal from "./eventmodal";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString("default", { month: "long" });

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res.data.data || res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
  };

  // ✅ FIXED HANDLE CLICK (NO UTC ISSUE)
  const handleClick = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const dayEvents = getEventsForDay(day);

    setSelectedDate(dateStr);
    setSelectedDayEvents(dayEvents);
  };

  const isToday = (day) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const getEventsForDay = (day) =>
    events.filter((e) => {
      const d = new Date(e.datetime);

      // ✅ PREVENT TIMEZONE SHIFT
      d.setHours(12);

      return (
        d.getDate() === day &&
        d.getMonth() === viewMonth &&
        d.getFullYear() === viewYear
      );
    });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthEventCount = events.filter((e) => {
    const d = new Date(e.datetime);

    // ✅ FIX TIMEZONE HERE ALSO
    d.setHours(12);

    return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
  }).length;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute -top-40 -left-28 w-[500px] h-[500px] rounded-full bg-purple-300 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -right-24 w-[380px] h-[380px] rounded-full bg-blue-300 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[280px] h-[280px] rounded-full bg-emerald-300 opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-12 w-[240px] h-[240px] rounded-full bg-pink-300 opacity-20 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-3 sm:p-5 lg:p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-950 tracking-tight">
              {monthName} {viewYear}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {monthEventCount} event{monthEventCount !== 1 ? "s" : ""} this month
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={prevMonth}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600 transition-all"
            >
              ‹
            </button>

            <button
              onClick={goToToday}
              className="px-3 sm:px-4 py-2 rounded-xl border border-gray-200  text-gray-600 hover:text-xs sm:text-sm font-semiboldbg-violet-50 hover:border-violet-200 hover:text-violet-600 transition-all"
            >
              Today
            </button>

            <button
              onClick={nextMonth}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600 transition-all"
            >
              ›
            </button>

            <div className="w-px h-6 bg-gray-200 mx-1" />

            {/* ✅ FIXED TODAY DATE */}
            <button
              onClick={() => {
                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

                setSelectedDate(todayStr);
                setSelectedDayEvents(getEventsForDay(today.getDate()));
              }}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-lg leading-none">+</span>
              New Event
            </button>
          </div>
        </div>

        {/* CALENDAR CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="grid grid-cols-7 gap-px bg-gray-100 overflow-x-auto">
            {weekDays.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-100 overflow-x-auto">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={"empty-" + i} className="min-h-[90px] bg-gray-50/60" />
            ))}

            {Array.from({ length: daysInMonth }, (_, idx) => {
              const day = idx + 1;
              const dayEvents = getEventsForDay(day);
              const todayCell = isToday(day);

              return (
                <div
                  key={day}
                  onClick={() => handleClick(day)}
                  className={`min-h-[75px] sm:min-h-[90px] p-1 sm:p-2 cursor-pointer transition-all duration-150 group
                    ${todayCell ? "bg-violet-50" : "bg-white hover:bg-violet-50/50"}`}
                >
                  <div className="flex justify-end mb-1">
                    <span className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                      ${todayCell
                        ? "bg-violet-600 text-white"
                        : "text-gray-500 group-hover:bg-violet-100 group-hover:text-violet-700"
                      }`}>
                      {day}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map((e, i) => (
                      <div key={i} className="text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 truncate">
                        {e.title || "Event"}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium px-1">
                        +{dayEvents.length - 2} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          existingEvents={selectedDayEvents}
          onClose={() => {
            setSelectedDate(null);
            setSelectedDayEvents([]);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
}