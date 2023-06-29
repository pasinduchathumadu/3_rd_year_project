// backend/controllers/payment-controllers.js
import {buildPDF} from '../services/pdf-service.js';

export const card = async (req, res, next) => {
  const { name, email } = req.body;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');

  buildPDF(
    (chunk) => res.write(chunk),
    () => res.end(),
    name,
    email
  );
};
