import { useEffect, useState } from "react";
import { getExcelData } from "../services/api";

export default function ExcelTable({ refresh }) {
  const [files, setFiles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExcelData();

        const allFiles = res.data || [];
        setFiles(allFiles);

        if (allFiles.length > 0) {
          setSelectedId(allFiles[0]._id);
          setData(allFiles[0].data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleChange = (id) => {
    setSelectedId(id);
    const file = files.find((f) => f._id === id);
    setData(file?.data || []);
  };

  return (
    <div className="mt-6">
      {/* 🔽 DROPDOWN */}
      <div className="mb-4">
        <select
          value={selectedId}
          onChange={(e) => handleChange(e.target.value)}
          className="border p-2 rounded-md bg-white"
        >
          {files.map((file) => (
            <option key={file._id} value={file._id}>
              {file.filename || "File"} •{" "}
              {file.data?.length || 0} rows •{" "}
              {file.createdAt
                ? new Date(file.createdAt).toLocaleDateString("en-IN")
                : "No date"}
            </option>
          ))}
        </select>
      </div>

      {/* 📄 TABLE */}
      {!data.length ? (
        <div className="text-gray-500 text-center">
          No data available
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
  <table className="min-w-max w-full border border-gray-700 text-black">
    <thead>
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th key={key} className="border p-2 whitespace-nowrap">
            {key}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {Object.values(row).map((val, j) => (
            <td key={j} className="border p-2 whitespace-nowrap">
              {val}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
    </div>
  );
}