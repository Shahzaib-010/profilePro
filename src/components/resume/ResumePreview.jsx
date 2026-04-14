import React from "react";
import ResumeRenderer from "./ResumeRenderer";
import { downloadPDF } from "../../utils/downloadPDF";

const ResumePreview = ({ resumeData, selectedTemplate }) => {
  return (
    <div className="flex flex-col items-center bg-gray-200 p-10 min-h-screen">
      {/* Download Action Bar */}
      <div className="mb-6 w-full max-w-[210mm] flex justify-end">
        <button
          onClick={() => downloadPDF("resume-container")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-lg transition-all font-semibold"
        >
          Download PDF
        </button>
      </div>

      {/* A4 Resume Container */}
      <div
        id="resume-container"
        className="bg-white shadow-2xl overflow-hidden print:shadow-none"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        <ResumeRenderer 
          resumeData={resumeData} 
          selectedTemplate={selectedTemplate} 
        />
      </div>
    </div>
  );
};

export default ResumePreview;