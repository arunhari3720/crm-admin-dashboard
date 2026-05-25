export default function BlogCard({ blog, onView, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded-lg space-y-2">

      {blog.image && (
        <img src={blog.image} className="w-full h-40 object-cover rounded" />
      )}

      <h2 className="font-semibold">{blog.title}</h2>

      <p className="text-sm text-gray-600">
        {blog.content.slice(0, 100)}...
      </p>

      <div className="flex gap-2">
        <button onClick={() => onView(blog)}>View</button>
        <button onClick={() => onEdit(blog)}>Edit</button>
        <button onClick={() => onDelete(blog)}>Delete</button>
      </div>
    </div>
  );
}