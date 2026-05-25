import { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { title: "design dashboard", user: "john", status: "pending" },
    { title: "fix bugs", user: "alex", status: "completed" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    user: "",
  });

  /* ADD TASK */
  const handleAddTask = () => {
    if (!form.title || !form.user) return;

    setTasks([...tasks, { ...form, status: "pending" }]);
    setForm({ title: "", user: "" });
    setShowModal(false);
  };

  /* TOGGLE STATUS */
  const toggleStatus = (index) => {
    const updated = [...tasks];
    updated[index].status =
      updated[index].status === "pending"
        ? "completed"
        : "pending";
    setTasks(updated);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-slate-800">
          tasks
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 shadow transition"
        >
          + add task
        </button>
      </div>

      {/* TASK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {tasks.map((task, i) => {
          const isCompleted = task.status === "completed";

          return (
            <div
              key={i}
              className={`relative p-5 rounded-2xl text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                isCompleted
                  ? "bg-gradient-to-r from-green-400 to-emerald-500"
                  : "bg-gradient-to-r from-yellow-400 to-orange-400"
              }`}
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent)]" />

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col justify-between h-full">

                <div>
                  {/* TITLE */}
                  <h3 className="text-lg font-semibold capitalize">
                    {task.title}
                  </h3>

                  {/* USER */}
                  <p className="text-sm opacity-90 mt-1">
                    assigned to {task.user}
                  </p>

                  {/* STATUS */}
                  <p className="text-xs mt-2 opacity-80 uppercase tracking-wide">
                    {task.status}
                  </p>
                </div>

                {/* ACTION */}
                <button
                  onClick={() => toggleStatus(i)}
                  className="mt-5 w-full py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm backdrop-blur transition"
                >
                  mark as {isCompleted ? "pending" : "completed"}
                </button>

              </div>
            </div>
          );
        })}

      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              add task
            </h3>

            {/* INPUTS */}
            <div className="space-y-3">

              <input
                type="text"
                placeholder="task title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                placeholder="assign to"
                value={form.user}
                onChange={(e) =>
                  setForm({ ...form, user: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 transition"
              >
                cancel
              </button>

              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
              >
                add
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}