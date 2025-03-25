import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { usePublicContext } from "../context/Context";

const ExportPDF = ({ onClose, task }) => {
  const { setOpenTaskActions, alert } = usePublicContext();
  const contentRef = useRef(null);

  const handleExportPDF = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}.pdf`
      );
    }
    alert(false, "Task exported successfully !");
    setOpenTaskActions(false);
    onClose();
  };

  return (
    <div>
      <div ref={contentRef} className="bg-white export-container p-3">
        <h1 className="text-start m-0">Task Report</h1>
        <div className="d-flex flex-row align-items-center flex-wrap mb-3 w-100 mt-4 row-gap-2">
          <span
            className={`${
              task?.priority === "High"
                ? `high`
                : task?.priority === "Medium"
                ? `medium`
                : `low`
            } px-2 py-1 rounded-pill task-card-priority me-2`}
          >
            {task?.priority}
          </span>
          <span
            className={`${
              task?.status === "Completed" && `completed`
            } px-2 py-1 rounded-pill task-card-status me-2`}
          >
            {task?.status}
          </span>
          <span className="px-2 py-1 rounded-pill task-card-category">
            {task?.category}
          </span>
        </div>
        <p
          className={`export-task-title text-start ${
            task?.status === "Completed" && `completed`
          }`}
        >
          {task?.title}
        </p>
        <p className="export-task-date text-start mt-2">{task?.date}</p>
      </div>

      <button
        onClick={handleExportPDF}
        className="mt-3 mx-2 px-3 py-1 export-btn"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ExportPDF;
