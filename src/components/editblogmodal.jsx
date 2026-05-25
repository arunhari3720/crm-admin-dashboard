import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function EditBlogModal({ blog, onClose, onSuccess }) {
  const [form, setForm] = useState(blog);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(blog);
  }, [blog]);

  const handleupdate = async () => {
    try {
      setLoading(true);

      const res = await API.put(`/blog/${blog._id}`, form);

      toast.success(res.data.message);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white text-black rounded-2xl p-6 w-full max-w-md space-y-4">

        <h2 className="text-lg font-semibold">Edit Blog</h2>

        <input
          value={form.title}
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          value={form.content}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <input
          value={form.author}
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleupdate}
            disabled={loading}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

      </div>
    </div>
  );
}