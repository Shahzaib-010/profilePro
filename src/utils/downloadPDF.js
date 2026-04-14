import html2pdf from 'html2pdf.js';

/**
 * Exports the specified DOM element to PDF
 * @param {string} elementId - The ID of the container to export
 */
export const downloadPDF = (elementId) => {
  const element = document.getElementById(elementId);
  
  const options = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true 
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  html2pdf().set(options).from(element).save();
};