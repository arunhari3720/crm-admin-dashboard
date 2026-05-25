import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import {
  Trash2,
  Search,
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  FileCode,
  X,
} from "lucide-react";

export default function Filedownload() {
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [deletepopup, setDeletepopup] = useState(false);

  const [selectedfile, setSelectedfile] = useState(null);

  // 🔥 Pagination
  const [currentpage, setCurrentpage] = useState(1);

  const [customrange, setCustomrange] = useState(null);

  const rowsperpage = 5;

  // 🔥 Get Files
  const getfiles = async () => {
    try {
      const response = await API.get("/files/all");

      setFiles(response.data.files);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Delete File
  const handledelete = async () => {
    try {
      setLoading(true);

      const response = await API.delete(`/files/delete/${selectedfile._id}`);

      toast.success(response.data.message);

      setFiles((prev) => prev.filter((item) => item._id !== selectedfile._id));

      setDeletepopup(false);

      setSelectedfile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getfiles();
  }, []);

  // 🔥 Search Filter
  const filteredfiles = files.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase()),
  );

  // 🔥 Pagination Logic
  const lastindex = currentpage * rowsperpage;

  const firstindex = lastindex - rowsperpage;

  const totalpages = Math.ceil(filteredfiles.length / rowsperpage);

  // 🔥 Current Files
  const currentfiles = customrange

  ? filteredfiles.slice(
      customrange.start,
      customrange.end
    )

  : filteredfiles.slice(
      firstindex,
      lastindex
    );

  // 🔥 Get Extension
  const getextension = (filename) => {
    return filename.split(".").pop().toUpperCase();
  };

  // 🔥 File Icons
  const getfileicon = (mimetype) => {
    if (mimetype.includes("image")) {
      return <FileImage className="text-pink-600" />;
    }

    if (mimetype.includes("video")) {
      return <FileVideo className="text-red-600" />;
    }

    if (mimetype.includes("audio")) {
      return <FileAudio className="text-green-600" />;
    }

    if (mimetype.includes("sheet") || mimetype.includes("excel")) {
      return <FileSpreadsheet className="text-emerald-600" />;
    }

    if (mimetype.includes("zip") || mimetype.includes("rar")) {
      return <FileArchive className="text-yellow-600" />;
    }

    if (mimetype.includes("json") || mimetype.includes("javascript")) {
      return <FileCode className="text-indigo-600" />;
    }

    return <FileText className="text-blue-600" />;
  };

  // 🔥 Force Download
  const handledownload = async (url, filename) => {
    try {
      const response = await fetch(url);

      const blob = await response.blob();

      const bloburl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = bloburl;

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(bloburl);
    } catch (error) {
      console.log(error);
      toast.error("Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">File Manager</h1>

        <p className="text-gray-500 mt-2">
          View, search, download and manage uploaded files.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        {/* Top */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Uploaded Files</h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Files: {filteredfiles.length}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setCurrentpage(1);

                setCustomrange(null);
              }}
              className="w-full pl-10 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  File
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Extension
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Size
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Uploaded Date
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentfiles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-16">
                    <FileText
                      size={55}
                      className="mx-auto text-gray-300 mb-4"
                    />

                    <p className="text-gray-500 text-lg">No files found</p>
                  </td>
                </tr>
              ) : (
                currentfiles.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* File */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-2xl">
                          {getfileicon(item.mimetype)}
                        </div>

                        <div className="max-w-xs">
                          <h3 className="font-semibold text-gray-800 break-all">
                            {item.filename}
                          </h3>
                        </div>
                      </div>
                    </td>

                    {/* Extension */}
                    <td className="px-6 py-5">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {getextension(item.filename)}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="px-6 py-5 text-gray-600">
                      {(item.filesize / 1024 / 1024).toFixed(2)} MB
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        {/* Download */}
                        <button
                          onClick={() =>
                            handledownload(item.fileurl, item.filename)
                          }
                          className="bg-white border hover:bg-gray-100 text-gray-700 p-3 rounded-xl transition shadow-sm"
                        >
                          {getfileicon(item.mimetype)}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            setSelectedfile(item);

                            setDeletepopup(true);
                          }}
                          disabled={loading}
                          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Static 1 to 5 */}
            {Array.from(
              {
                length: Math.min(5, totalpages),
              },
              (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentpage(page);

                      setCustomrange(null);
                    }}
                    className={`w-11 h-11 rounded-xl font-semibold border transition ${
                      currentpage === page && !customrange
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              },
            )}

            {/* Dropdown */}
            {totalpages > 5 && (
              <select
                defaultValue=""
                onChange={(e) => {
                  const value = e.target.value;

                  if (!value) return;

                  const [startpage, endpage] = value.split("-").map(Number);

                  const startindex = (startpage - 1) * rowsperpage;

                  const endindex = endpage * rowsperpage;

                  setCustomrange({
                    start: startindex,
                    end: endindex,
                  });
                }}
                className="h-11 rounded-xl border px-4 bg-white text-gray-700 outline-none hover:border-blue-400"
              >
                <option value="">More</option>

                {Array.from(
                  {
                    length: Math.ceil((totalpages - 5) / 5),
                  },
                  (_, index) => {
                    const start = index * 5 + 6;

                    const end = Math.min(start + 4, totalpages);

                    return (
                      <option key={start} value={`${start}-${end}`}>
                        {start} - {end}
                      </option>
                    );
                  },
                )}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Delete Popup */}
      {deletepopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setDeletepopup(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="bg-red-100 p-5 rounded-full">
                <Trash2 className="text-red-600" size={35} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800">
              Delete File
            </h2>

            <p className="text-gray-500 text-center mt-3 break-all">
              Are you sure want to delete
            </p>

            <p className="text-center font-semibold text-red-600 mt-2 break-all">
              {selectedfile?.filename}
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setDeletepopup(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-2xl transition"
              >
                Cancel
              </button>

              <button
                onClick={handledelete}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl transition"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
