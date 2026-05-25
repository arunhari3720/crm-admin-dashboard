import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

const moduleColors = [
  { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", toggle: "bg-violet-500", dot: "bg-violet-400" },
  { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700", toggle: "bg-sky-500", dot: "bg-sky-400" },
  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", toggle: "bg-emerald-500", dot: "bg-emerald-400" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", toggle: "bg-amber-500", dot: "bg-amber-400" },
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", toggle: "bg-rose-500", dot: "bg-rose-400" },
  { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-700", toggle: "bg-fuchsia-500", dot: "bg-fuchsia-400" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", toggle: "bg-teal-500", dot: "bg-teal-400" },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", toggle: "bg-orange-500", dot: "bg-orange-400" },
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", toggle: "bg-blue-500", dot: "bg-blue-400" },
];

const roleColors = {
  admin: "bg-violet-100 text-violet-700 border-violet-300",
  manager: "bg-sky-100 text-sky-700 border-sky-300",
  user: "bg-emerald-100 text-emerald-700 border-emerald-300",
  hr: "bg-rose-100 text-rose-700 border-rose-300",
};

// TOGGLE SWITCH
function ToggleSwitch({
  isOn,
  onToggle,
  color,
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center w-14 h-7 rounded-full transition-all duration-300 focus:outline-none shadow-inner ${
        isOn
          ? color.toggle
          : "bg-slate-200"
      }`}
    >

      <span
        className={`absolute left-1.5 text-white text-[9px] font-bold transition-opacity duration-200 ${
          isOn
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        ON
      </span>

      <span
        className={`absolute right-1.5 text-slate-400 text-[9px] font-bold transition-opacity duration-200 ${
          !isOn
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        OFF
      </span>

      <span
        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
          isOn
            ? "left-8"
            : "left-1"
        }`}
      />
    </button>
  );
}

export default function Roles() {

  const [modules, setModules] = useState([]);

  const [selectedModules, setSelectedModules] = useState([]);

  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);

  // FETCH MODULES
  const fetchModules = async () => {

    try {

      const response = await API.get(
        "/modules"
      );

      setModules(
        response.data.data || []
      );

    } catch (error) {

      toast.error(
        "Failed to fetch modules"
      );
    }
  };

  // 🔥 FETCH SAVED PERMISSIONS
  const fetchRolePermissions = async (
    selectedRole
  ) => {

    try {

      const response = await API.get(
        `/permissions/${selectedRole}`
      );

      // 🔥 CONVERT TO IDS
      const ids = response.data.data.map(
        (item) => item._id
      );

      setSelectedModules(ids);

    } catch (error) {

      console.log(error);

      setSelectedModules([]);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchModules();
  }, []);

  // 🔥 AUTO LOAD SAVED STATE
  useEffect(() => {

    fetchRolePermissions(role);

  }, [role]);

  // TOGGLE MODULE
  const toggleModule = (moduleId) => {

    const exists =
      selectedModules.includes(moduleId);

    if (exists) {

      setSelectedModules(
        selectedModules.filter(
          (id) => id !== moduleId
        )
      );

    } else {

      setSelectedModules([
        ...selectedModules,
        moduleId,
      ]);
    }
  };

  // SAVE PERMISSIONS
  const savePermissions = async () => {

    try {

      setLoading(true);

      await API.post("/permissions", {
        role,
        modules: selectedModules,
      });

      toast.success(
        "Permissions updated"
      );
             
    await fetchRolePermissions(role);

// 🔥 FORCE FULL APP REFRESH
       setTimeout(() => {
            window.location.reload();
                              }, 500);
    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update permissions"
      );

    } finally {

      setLoading(false);
    }
  };

  const allowedCount =
    selectedModules.length;

  const totalCount =
    modules.length;

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>

          <div className="flex items-center gap-2 mb-1">

            <div className="w-2 h-6 rounded-full bg-gradient-to-b from-violet-500 to-indigo-500"></div>

            <h2 className="text-2xl font-bold text-slate-800">
              Role Permission Management
            </h2>

          </div>

          <p className="text-sm text-slate-400 ml-4">
            Assign sidebar access based on user role
          </p>

        </div>

        <button
          onClick={savePermissions}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>

              Saving...
            </>
          ) : (
            "Save Permissions"
          )}
        </button>

      </div>

      {/* ROLE SELECT */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">

        <div className="flex-1">

          <label className="block mb-2 text-sm font-semibold text-slate-600">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
          >
            <option value="admin">
              Admin
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="user">
              User
            </option>

            <option value="hr">
              HR
            </option>

          </select>

        </div>

        <div className="flex items-center gap-3">

          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold border capitalize ${
              roleColors[role] ||
              "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            {role}
          </span>

          <div className="text-right">

            <p className="text-xs text-slate-400">
              Modules Allowed
            </p>

            <p className="text-lg font-bold text-slate-700">

              <span className="text-violet-600">
                {allowedCount}
              </span>

              <span className="text-slate-300 mx-1">
                /
              </span>

              {totalCount}

            </p>

          </div>

        </div>

      </div>

      {/* MODULE GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {modules.map((item, index) => {

          const isSelected =
            selectedModules.includes(
              item._id
            );

          const color =
            moduleColors[
              index % moduleColors.length
            ];

          return (
            <div
              key={item._id}
              className={`bg-white border-2 rounded-2xl p-4 flex justify-between items-center transition-all duration-200 shadow-sm hover:shadow-md ${
                isSelected
                  ? `${color.border} ${color.bg}`
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                    isSelected
                      ? color.dot
                      : "bg-slate-300"
                  }`}
                />

                <div>

                  <h3
                    className={`font-semibold capitalize text-sm ${
                      isSelected
                        ? color.text
                        : "text-slate-700"
                    }`}
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.path}
                  </p>

                </div>

              </div>

              <div className="flex flex-col items-center gap-1 ml-3 flex-shrink-0">

                <ToggleSwitch
                  isOn={isSelected}
                  onToggle={() =>
                    toggleModule(item._id)
                  }
                  color={color}
                />

                <span
                  className={`text-[10px] font-semibold tracking-wide ${
                    isSelected
                      ? color.text
                      : "text-slate-400"
                  }`}
                >
                  {isSelected
                    ? "Allowed"
                    : "Denied"}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}