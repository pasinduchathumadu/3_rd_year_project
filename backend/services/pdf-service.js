// services/pdf-service.js
import PDFDocument from 'pdfkit';

export function 
  buildPDF(dataCallback, endCallback,name,email) {
    const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(20).text('A heading');

    doc
    .fontSize(12)
    .text(`Name: ${name}`);
    doc
    .fontSize(12)
    .text(`Email: ${email}`);

    doc.end();
  }

