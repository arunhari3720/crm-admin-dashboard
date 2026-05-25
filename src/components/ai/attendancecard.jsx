// src/components/attendancecard.jsx

import { useState } from "react";

import AICard from "./aicard";
import AttendanceAssistant from "./attendanceassistant";

export default function AttendanceCard(props) {
  const { item } = props;

  const [open, setopen] = useState(false);

  // 🔥 GET USER FROM LOCAL STORAGE
 // 🔥 GET ROLE DIRECTLY
const role = localStorage
  .getItem("role")
  ?.trim()
  ?.toLowerCase();

// 🔥 ALLOWED ROLES
const allowedRoles = ["admin", "hr"];

// ❌ HIDE CARD
if (!allowedRoles.includes(role)) {
  return null;
}


  return (
    <>
      {/* 🔥 MAIN CARD */}

      <div onClick={() => setopen(true)}>
        <AICard {...props}>
          {/* 🔥 IMAGE */}

          <img
            src={item.image}
            alt={item.title}
            className="
              h-20
              w-20
              rounded-2xl
              object-cover
            "
          />

          {/* 🔥 TITLE */}

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-gray-800
            "
          >
            {item.title}
          </h2>

          {/* 🔥 DESCRIPTION */}

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-gray-500
            "
          >
            {item.description}
          </p>

          {/* 🔥 BUTTON */}

          <button
            className={`
              mt-6
              rounded-2xl
              bg-gradient-to-r
              ${item.color}
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
            `}
          >
            Open Assistant
          </button>
        </AICard>
      </div>

      {/* 🔥 ASSISTANT MODAL */}

      <AttendanceAssistant
        open={open}
        setopen={setopen}
      />
    </>
  );
}