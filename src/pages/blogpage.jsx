import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import SubscribeForm from "../components/subscribeform";

export default function BlogPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(form.title)) {
      newErrors.title = "Special characters are not allowed";
    }

    if (!form.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!form.author.trim()) {
      newErrors.author = "Author is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.author)) {
      newErrors.author = "Only characters allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 HANDLE CREATE
  const handlecreate = async () => {
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    // ✅ image validation block (no logic change, just protection)
    if (imageError) {
      toast.error("Please fix image errors");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("author", form.author);

    if (image) {
      formData.append("image", image);
    }

    let toastId;

    try {
      setLoading(true);
      toastId = toast.loading("Publishing blog...");

      const res = await API.post("/blog", formData);

      toast.success(res.data.message || "Blog created successfully", {
        id: toastId,
      });

      setForm({ title: "", content: "", author: "" });
      setImage(null);
      setErrors({});
      setImageError(""); // ✅ reset

      document.getElementById("imageInput").value = "";

    } catch (err) {
      console.log("ERROR:", err.response);

      toast.error(
        err.response?.data?.message || "error creating blog",
        { id: toastId }
      );
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Create Blog</h1>
          <p className="text-gray-500 text-sm">
            Publish a blog and notify subscribers instantly
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6">

          {/* TITLE */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              value={form.title}
              placeholder="Enter blog title"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              onChange={(e) => {
                const value = e.target.value;

                if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                  setForm({ ...form, title: value });
                  setErrors({ ...errors, title: "" });
                } else {
                  setErrors({
                    ...errors,
                    title: "Special characters are not allowed",
                  });
                }
              }}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>

          {/* CONTENT */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.content}
              placeholder="Write your blog content..."
              rows={6}
              className={`w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 ${
                errors.content
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />
            {errors.content && (
              <p className="text-red-500 text-xs">{errors.content}</p>
            )}
          </div>

          {/* AUTHOR */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              value={form.author}
              placeholder="Enter author name"
              className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ${
                errors.author
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              onChange={(e) => {
                const value = e.target.value;

                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setForm({ ...form, author: value });
                  setErrors({ ...errors, author: "" });
                } else {
                  setErrors({
                    ...errors,
                    author: "Only characters allowed",
                  });
                }
              }}
            />
            {errors.author && (
              <p className="text-red-500 text-xs">{errors.author}</p>
            )}
          </div>

          {/* IMAGE */}
          {/* IMAGE */}
<div className="space-y-1">

  {/* ✅ INLINE LABEL */}
  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
    Upload Image
    <span className="text-red-500">*</span>
    <span className="text-xs text-gray-400">
      (JPG, JPEG, PNG • Max 2MB)
    </span>
  </label>

  <input
    id="imageInput"
    type="file"
    accept=".jpg,.jpeg,.png"
    className="w-full text-sm"
    onChange={(e) => {
      const file = e.target.files[0];

      if (!file) return;

      if (!ALLOWED_TYPES.includes(file.type)) {
        setImage(null);
        setImageError("Only JPG, JPEG, PNG allowed");
        e.target.value = "";
        return;
      }

      if (file.size > MAX_SIZE) {
        setImage(null);
        setImageError("Max file size is 2MB");
        e.target.value = "";
        return;
      }

      setImage(file);
      setImageError("");
    }}
  />

  {imageError && (
    <p className="text-red-500 text-xs">{imageError}</p>
  )}

</div>

          {/* BUTTON */}
          <button
            onClick={handlecreate}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

        </div>

        <SubscribeForm />
      </div>
    </div>
  );
}