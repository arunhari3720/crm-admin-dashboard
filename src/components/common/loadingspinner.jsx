export default function LoadingSpinner({
  title = "Loading...",
  subtitle = "Please wait while we process your request.",
}) {
  return (
    <div
      className="
        flex
        min-h-[400px]
        flex-col
        items-center
        justify-center
        px-4
        text-center
      "
    >
      {/* SPINNER */}

      <div className="relative">
        <div
          className="
            h-20
            w-20
            rounded-full
            border-4
            border-slate-200
          "
        />

        <div
          className="
            absolute
            inset-0
            animate-spin
            rounded-full
            border-4
            border-transparent
            border-t-indigo-600
          "
        />
      </div>

      {/* CONTENT */}

      <h2 className="mt-8 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}