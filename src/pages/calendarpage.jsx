import { useState } from "react";
import Calendar from "../components/calendar";
import NotificationDropdown from "../components/notification_dropdown";

export default function CalendarPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Calendar</h1>

       
      </div>

      <Calendar />
    </div>
  );
}