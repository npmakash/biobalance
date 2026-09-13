import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

/**
 * Extract raw text content from a client-uploaded PDF file
 * @param {File} file - User uploaded PDF file
 * @returns {Promise<string>} - Extracted text string
 */
export async function extractTextFromPDF(file) {
  if (!file) return '';

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    let fullText = '';
    const totalPages = Math.min(pdfDocument.numPages, 5); // Read first 5 pages max for quick processing

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageItems = textContent.items.map((item) => item.str).join(' ');
      fullText += `[Page ${pageNum}]\n${pageItems}\n\n`;
    }

    return fullText.trim();
  } catch (error) {
    console.warn('PDFjs extraction fallback:', error);
    // Basic text fallback if PDF parsing meets standard text stream
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result || '';
        resolve(typeof text === 'string' ? text.slice(0, 3000) : 'Medical report uploaded: ' + file.name);
      };
      reader.onerror = () => resolve('Medical report attached: ' + file.name);
      reader.readAsText(file);
    });
  }
}
