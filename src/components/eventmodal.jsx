import { useState } from "react";
import toast from "react-hot-toast";
import { createEvent, updateEvent, deleteEvent } from "../services/api";

export default function EventModal({ selectedDate, existingEvents = [], onClose }) {
  const [view, setView] = useState(existingEvents.length > 0 ? "list" : "create");

  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    title: "",
    agenda: "",
    time: "",
    meetinglink: ""
  });

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async () => {
    if (!form.title || !form.time) {
      return toast.error("Fill required fields");
    }

    const datetime = new Date(`${selectedDate}T${form.time}`);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return toast.error("User not logged in");
    }

    try {
      if (editingId) {
        // UPDATE
        await updateEvent(editingId, {
          ...form,
          datetime
        });

        toast.success("Meeting Updated ✏️");
      } else {
        // CREATE
        await createEvent({
          ...form,
          datetime,
          user_id: userId
        });

        toast.success("Meeting Created 🎉");
      }

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Action failed");
    }
  };

  /* ---------------- EDIT (POPUP FORM) ---------------- */
  const handleEdit = (e) => {
    const date = new Date(e.datetime);

    setForm({
      title: e.title || "",
      agenda: e.agenda || "",
      time: date.toISOString().slice(11, 16),
      meetinglink: e.meetinglink || ""
    });

    setEditingId(e._id);
    setView("create"); // reuse same UI
  };

  /* ---------------- DELETE ---------------- */
  const confirmDelete = async () => {
    try {
      await deleteEvent(showDeleteConfirm);
      toast.success("Event deleted 🗑️");
      onClose();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ---------------- HELPERS ---------------- */
  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/50 backdrop-blur-sm">
      <div className="bg-white w-[460px] rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 relative">
          <h2 className="text-white font-bold text-lg">
            {editingId
              ? "Edit Meeting"
              : view === "create"
              ? "New Meeting"
              : "Meetings"}
          </h2>

          <p className="text-violet-200 text-xs mt-0.5">
            {formatDate(selectedDate)}
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-5 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ✕
          </button>
        </div>

        <div className="p-6">

          {/* LIST VIEW */}
          {view === "list" && (
            <>
              <div className="flex flex-col gap-3 mb-5">
                {existingEvents.map((e) => (
                  <div
                    key={e._id}
                    className="border border-gray-100 rounded-xl p-4 hover:border-violet-200 hover:bg-violet-50/40"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{e.title}</h3>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                          {formatTime(e.datetime)}
                        </span>

                        <button
                          onClick={() => handleEdit(e)}
                          className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setShowDeleteConfirm(e._id)}
                          className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {e.agenda && (
                      <p className="text-xs text-gray-500 mb-3">{e.agenda}</p>
                    )}

                    {e.meetinglink && (
                      <a
                        href={e.meetinglink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600"
                      >
                        Join Meeting
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setView("create")}
                className="w-full py-2.5 border-2 border-dashed border-violet-200 text-violet-500 rounded-xl"
              >
                + Add Another Meeting
              </button>
            </>
          )}

          {/* CREATE / EDIT VIEW */}
          {view === "create" && (
            <>
              {existingEvents.length > 0 && (
                <button
                  onClick={() => setView("list")}
                  className="text-xs text-gray-400 mb-4"
                >
                  ← Back to meetings
                </button>
              )}

              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Title"
                className="w-full mb-3 p-2 border rounded text-black"
              />

              <textarea
                value={form.agenda}
                onChange={(e) => setForm({ ...form, agenda: e.target.value })}
                placeholder="Agenda"
                className="w-full mb-3 p-2 border rounded text-black"
              />

              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full mb-3 p-2 border rounded text-black"
              />

              <input
                value={form.meetinglink}
                onChange={(e) => setForm({ ...form, meetinglink: e.target.value })}
                placeholder="Meeting Link"
                className="w-full mb-4 p-2 border rounded text-black"
              />

              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 border rounded text-black py-2">
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-violet-600 text-white rounded py-2"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-[300px] text-center">
            <p className="text-sm text-black  mb-4">Are you sure you want to delete this event?</p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 border text-black py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}