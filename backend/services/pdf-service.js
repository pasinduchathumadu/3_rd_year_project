// services/pdf-service.js
import PDFDocument from 'pdfkit';

export function buildPDF(res, email) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  // Pipe the PDF data directly to the response object
  doc.pipe(res);

  doc.fontSize(20).text('A heading');

  doc.fontSize(12).text(`Email: ${email}`); // Include the email in the PDF

  doc.end();
}
