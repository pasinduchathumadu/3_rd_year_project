
import pdfService from "../services/pdf-service.js";

export const card = async(req,res,next)=>{

    const stream= res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=invoice.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  )};