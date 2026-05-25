import { useState } from "react";
import { uploadExcel } from "../services/api";
import toast from "react-hot-toast";

export default function ExcelUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select file");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadExcel(formData);
      toast.success("Uploaded successfully");
      onUpload(); // refresh table
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-white mb-3"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded-lg text-white"
      >
        Upload
      </button>
    </div>
  );
}