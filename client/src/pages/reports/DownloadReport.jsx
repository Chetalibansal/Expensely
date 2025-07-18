// src/pages/reports/DownloadReport.jsx

import { FiDownload } from "react-icons/fi";

const DownloadReport = ({ data }) => {
  const handleDownload = () => {
    const csv = [
      ["Category", "Amount"],
      ...data.map((item) => [item.category, item.amount]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expense-report.csv";
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
    >
      <FiDownload />
      Download CSV
    </button>
  );
};

export default DownloadReport;
