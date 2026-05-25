import API from "../services/api";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DeleteConfirm({ blog, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handledelete = async () => {
    try {
      setLoading(true);

      const res = await API.delete(`/blog/${blog._id}`);

      toast.success(res.data.message);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("delete failed");
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm space-y-4 text-center">

        <h2 className="text-lg font-semibold">Delete Blog</h2>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this blog?
        </p>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handledelete}
            disabled={loading}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}