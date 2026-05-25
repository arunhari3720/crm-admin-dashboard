import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../components/blogcard";
import BlogDetailModal from "../components/blogdetailmodal";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchblogs = async () => {
    const res = await API.get("/blog");
    setBlogs(res.data.data);
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  return (
    <div className="p-6 bg-white text-black space-y-4">

      <h1 className="text-2xl font-semibold">Blogs</h1>

      <div className="grid grid-cols-3 gap-4">
        {blogs.map((b) => (
          <BlogCard
            key={b._id}
            blog={b}
            onView={(blog) => setSelected(blog)}
          />
        ))}
      </div>

      {selected && (
        <BlogDetailModal
          blog={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}