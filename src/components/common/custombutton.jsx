import { Loader2 } from "lucide-react";

export default function CustomButton({
  children,
  onClick,
  loading,
  variant = "primary",
  fullWidth,
  disabled,
  icon: Icon,
}) {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",

    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100",

    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100",

    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-300
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${variants[variant]}

        ${fullWidth ? "w-full" : ""}
      `}
    >
      {/* LOADING */}

      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {/* ICON */}

      {!loading && Icon && (
        <Icon size={18} />
      )}

      {/* TEXT */}

      <span>{children}</span>
    </button>
  );
}