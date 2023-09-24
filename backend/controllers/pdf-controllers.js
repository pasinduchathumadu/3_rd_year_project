// backend/controllers/payment-controllers.js
import { buildPDF } from '../services/pdf-service.js';

export const card = async (req, res, next) => {
  const { email } = req.body; // Ensure email is being received from the request body
 
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');

  // Pass the email as an argument to the buildPDF function
  buildPDF(res, email);

  // No need to manually end the response here
};
