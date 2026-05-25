import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Modules() {

  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({ name: "", path: "", icon: "" });
  const [loading, setLoading] = useState(false);

  // FETCH MODULES
  const fetchModules = async () => {
    try {
      const response = await API.get("/modules");
      setModules(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch modules");
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD MODULE
  const addModule = async () => {
    try {
      if (!form.name || !form.path) {
        return toast.error("Name and path required");
      }
      setLoading(true);
      await API.post("/modules", form);
      toast.success("Module added");
      setForm({ name: "", path: "", icon: "" });
      fetchModules();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-violet-500 to-indigo-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Module Management</h1>
          <p className="text-sm text-slate-400">Create and manage sidebar modules</p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Add New Module</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">
              Module Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Dashboard"
              value={form.name}
              onChange={handleChange}
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">
              Path <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="path"
              placeholder="e.g. /dashboard"
              value={form.path}
              onChange={handleChange}
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Icon</label>
            <input
              type="text"
              name="icon"
              placeholder="e.g. folder"
              value={form.icon}
              onChange={handleChange}
              className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition"
            />
          </div>

        </div>

        <button
          onClick={addModule}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Adding...
            </>
          ) : (
            <>
              <span className="text-base font-bold leading-none">+</span>
              Add Module
            </>
          )}
        </button>

      </div>

      {/* SECTION LABEL */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">All Modules</span>
        <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 text-xs font-bold">
          {modules.length}
        </span>
      </div>

      {/* MODULE LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
          >
            {/* ICON AVATAR */}
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-slate-500 uppercase">
                {item.icon ? item.icon.charAt(0) : item.name.charAt(0)}
              </span>
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-800 capitalize truncate">{item.name}</p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{item.path}</p>
              {item.icon && (
                <span className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  {item.icon}
                </span>
              )}
            </div>

            {/* STATUS DOT */}
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
          </div>
        ))}
      </div>

    </div>
  );
}