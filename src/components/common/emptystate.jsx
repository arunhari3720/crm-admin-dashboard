import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  subtitle = "There is currently no data available to display.",
  buttonText,
  onClick,
  icon: Icon = Inbox,
}) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
      "
    >
      {/* ICON */}

      <div
        className="
          mx-auto
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-slate-100
        "
      >
        <Icon className="h-11 w-11 text-slate-400" />
      </div>

      {/* CONTENT */}

      <h2 className="mt-8 text-3xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500">
        {subtitle}
      </p>

      {/* BUTTON */}

      {buttonText && (
        <button
          onClick={onClick}
          className="
            mt-8
            rounded-2xl
            bg-indigo-600
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-100
            transition-all
            duration-300
            hover:bg-indigo-700
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}