export default function BlogDetailModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      {/* MODAL CONTAINER */}
      <div className="bg-white text-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

        {/* IMAGE */}
        {blog.image && (
          <img
            src={blog.image}
            className="w-full h-60 object-cover rounded-t-2xl"
          />
        )}

        {/* CONTENT */}
        <div className="p-6 space-y-4">

          <h1 className="text-2xl font-semibold leading-tight">
            {blog.title}
          </h1>

          <p className="text-gray-500 text-sm">
            By {blog.author || "admin"}
          </p>

          {/* BLOG TEXT */}
          <div className="text-gray-700 leading-7 whitespace-pre-line text-sm">
            {blog.content}
          </div>

          {/* BUTTON */}
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-gray-800"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}