import { useEffect, useState } from "react";
import { getProjectsApi } from "../services/api";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async (selectedPage) => {
    try {
      let allData = [];

      // 🔥 fetch all pages up to selected page
      for (let i = 1; i <= selectedPage; i++) {
        const res = await getProjectsApi(i, 10);

        allData = [...allData, ...res.data.projects];

        // set total pages once
        if (i === 1) {
          setTotalPages(res.data.total_pages);
        }
      }

      setProjects(allData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Projects
      </h1>

      {/* DROPDOWN */}
      <div className="mb-6">
        <select
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Page {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((item) => (
          <div
            key={item._id}
            className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm"
          >
            <h2 className="font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>

      {/* INFO */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Showing {projects.length} items
      </p>
    </div>
  );
}

export default ProjectList;  