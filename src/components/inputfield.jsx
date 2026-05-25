import { User, Hash, Briefcase, Calendar, IndianRupee } from "lucide-react";

export default function Inputfield({
  label,
  name,
  value,
  onChange,
  icon
}) {
  return (
    <div className="relative w-full">

      {/* ICON */}
      <div className="absolute left-3 top-3 text-gray-400">
        {icon}
      </div>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="
          peer w-full pl-10 pr-3 pt-5 pb-2.5 text-sm
          bg-white border border-gray-300 rounded-lg
          outline-none transition-all duration-200

          focus:border-indigo-500
          focus:ring-2 focus:ring-indigo-200
          hover:border-gray-400
        "
      />

      <label
        className="
  absolute
  left-10
  right-3
  top-2
  text-xs
  text-gray-500
  transition-all
  duration-200
  whitespace-nowrap
  overflow-hidden
  text-ellipsis

  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-xs
  sm:peer-placeholder-shown:text-sm
  peer-placeholder-shown:text-gray-400

  peer-focus:top-2
  peer-focus:text-xs
  peer-focus:text-indigo-600
"
        
      >
        {label}
      </label>

    </div>
  );
}