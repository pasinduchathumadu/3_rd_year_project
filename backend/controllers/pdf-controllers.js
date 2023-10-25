// backend/controllers/payment-controllers.js
import { buildPDF, buildPDF1, buildPDF2 ,buildPDF3} from '../services/pdf-service.js';

export const card = async (req, res, next) => {
  const {
    price,
    placed_date,
    early_cancel_date,
    package_name,
    appointment_id,
    appointment_status,
    client_email,
    item } = req.body;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');

  // Pass the email as an argument to the buildPDF function
  buildPDF(res,
    price,
    placed_date,
    early_cancel_date,
    package_name,
    appointment_id,
    appointment_status,
    client_email,
    item);

  // No need to manually end the response here
};

export const card1 = async (req, res, next) => {
  const {
    po_id,
    order_email,
    placed_date,
    placed_time,
    handover_date,
    payment,
    payment_method,
    collecting_method,
    shipping_address,
    shipping_number,
    item } = req.body;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');

  // Pass the email as an argument to the buildPDF function
  buildPDF1(res,
    po_id,
    order_email,
    placed_date,
    placed_time,
    handover_date,
    payment,
    payment_method,
    collecting_method,
    shipping_address,
    shipping_number,
    item);

  // No need to manually end the response here
};
export const card2 = async (req, res, next) => {
  const {
    request_id,
    client_id,
    pet_id,
    package_name,
    board_arrival_date,
    board_carry_date,
    price,
    item } = req.body;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');

  // Pass the email as an argument to the buildPDF function
  buildPDF2(res,
    request_id,
    client_id,
    pet_id,
    package_name,
    board_arrival_date,
    board_carry_date,
    price,
    item);

  // No need to manually end the response here
};
export const card3 = async (req, res, next) => {
  const {
    appointment_id,
    client_email,
    placed_date,
    first_name,
    last_name,
    pet_id,
    payment,
    item } = req.body;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');

  // Pass the email as an argument to the buildPDF function
  buildPDF3(res,
    appointment_id,
    client_email,
    placed_date,
    first_name,
    last_name,
    pet_id,
    payment,
    item);

  // No need to manually end the response here
};