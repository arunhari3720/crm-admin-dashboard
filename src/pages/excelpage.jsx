import ExcelUpload from "../components/excelupload";
import ExcelTable from "../components/exceltable";
import { useState } from "react";

export default function ExcelPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">
      <ExcelUpload onUpload={() => setRefresh(!refresh)} />
      <ExcelTable key={refresh} />
    </div>
  );
}