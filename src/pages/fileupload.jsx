import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import {
  Upload,
  X,
  FileArchive,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState([]);

  const [totalfiles, setTotalfiles] = useState(0);

  const [totalsize, setTotalsize] = useState(0);

  const maxsize = 2 * 1024 * 1024;

  // ======================================================
  // 🔥 GET FILES
  // ======================================================

  const getfiles = async () => {
    try {
      const response = await API.get("/files/all");

      const filedata = response.data.files;

      setFiles(filedata);

      setTotalfiles(filedata.length);

      const totalsizebytes = filedata.reduce(
        (acc, item) => acc + item.filesize,
        0,
      );

      setTotalsize(totalsizebytes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfiles();
  }, []);

  // ======================================================
  // 🔥 FILE VALIDATION
  // ======================================================

  const handlefilechange = (e) => {
    const selectedfile = e.target.files[0];

    if (!selectedfile) return;

    if (selectedfile.size > maxsize) {
      toast.error("File size must be below 2MB");

      e.target.value = "";

      setFile(null);

      return;
    }

    setFile(selectedfile);
  };

  // ======================================================
  // 🔥 UPLOAD FILE
  // ======================================================

  const handleupload = async () => {
    if (!file) {
      return toast.error("Please select file");
    }

    try {
      setLoading(true);

      const formdata = new FormData();

      // 🔥 FILE ONLY
      formdata.append("file", file);

      const response = await API.post("/files/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);

      window.dispatchEvent(
      new Event("notification-refresh"));

      setFile(null);

      setOpen(false);

      getfiles();

      document.getElementById("fileinput").value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 sm:p-6">
      {/* HEADER */}

      <div className="mb-8 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          File Upload Center
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Upload and manage your files securely.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {/* TOTAL */}

        <div className="bg-white rounded-3xl shadow-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Uploads</p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {totalfiles}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Upload className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* STORAGE */}

        <div className="bg-white rounded-3xl shadow-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Storage Used</p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {(totalsize / 1024 / 1024).toFixed(2)} MB
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <FileArchive className="text-green-600" />
            </div>
          </div>
        </div>

        {/* SUPPORTED */}

        <div className="bg-white rounded-3xl shadow-lg border p-6 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Supported Files</p>

              <h2 className="text-lg font-semibold mt-2 text-gray-800">
                PDF, Excel, ZIP
              </h2>
            </div>

            <div className="bg-purple-100 p-4 rounded-2xl">
              <FileSpreadsheet className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD CARD */}

      <div className="flex justify-center">
        <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl border p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-52 h-52 bg-blue-300 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-5 rounded-3xl">
                <ShieldCheck size={42} className="text-blue-600" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3">
              Upload Files
            </h2>

            <p className="text-gray-500 mb-8 text-sm sm:text-base">
              Upload documents, images, videos, archives and more.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition mx-auto w-full sm:w-auto"
            >
              <Upload size={22} />
              Upload File
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Upload File
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              Select and upload your file securely
            </p>

            <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-3xl p-6 sm:p-10 text-center">
              <Upload size={55} className="mx-auto text-blue-600 mb-5" />

              <input
                id="fileinput"
                type="file"
                onChange={handlefilechange}
                className="w-full text-sm"
              />
            </div>

            {file && (
              <div className="mt-6 bg-gray-100 rounded-3xl p-5 space-y-3">
                <p className="text-sm break-all">
                  <strong>Name:</strong> {file.name}
                </p>

                <p className="text-sm">
                  <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)}{" "}
                  MB
                </p>

                <p className="text-sm break-all">
                  <strong>Type:</strong> {file.type || "Unknown"}
                </p>
              </div>
            )}

            <button
              onClick={handleupload}
              disabled={loading}
              className="w-full mt-7 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-2xl font-semibold transition shadow-lg"
            >
              {loading ? "Uploading..." : "Upload Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
