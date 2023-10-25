import PDFDocument from 'pdfkit';

export function buildPDF(res,
  price,
  placed_date,
  early_cancel_date,
  package_name,
  appointment_id,
  appointment_status,
  client_email,
  item) {
  const doc = new PDFDocument({ margin: 50, size: 'letter', layout: 'landscape' });

  // Pipe the PDF data directly to the response object
  doc.pipe(res);

  // Set the text color to black
  doc.fillColor('black');

  // Set the title
  doc.fontSize(24)
    .text('Happy Tails PetCare Pvt Ltd', { align: 'center' })
    .moveDown(0.5);

  doc.fontSize(18)
    .text(`Your ${item} Receipt`, { align: 'center' })
    .moveDown(2);

  // Display client information
  doc.text(`Client Email: ${client_email}`)
    .moveDown(0.5);
  doc.text(`Appointment ID: ${appointment_id}`)
    .moveDown(0.5);
  doc.text(`Appointment Status: ${appointment_status}`)
    .moveDown(0.5);
  doc.text(`Package Name: ${package_name}`)
    .moveDown(0.5);
  doc.text(`Placed Date: ${placed_date}`)
    .moveDown(0.5);
  doc.text(`Early Cancel Date: ${early_cancel_date}`)
    .moveDown(0.5);

  // Display the price
  doc.fontSize(16)
    .text(`Total Price: $${price.toFixed(2)}`)
    .moveDown(3);

  doc.fillColor('red')
  doc.fontSize(16)
    .text('Thank You for Choosing Happy Tails PetCare CareCenter', { align: 'center' })
    .moveDown(0.5);
  doc.fontSize(16)
    .text('Come Again!!!', { align: 'center' })
    .fillColor('red')
    .moveDown(0.5);

  // Add a border around the content
  doc.rect(0, 0, doc.page.width, doc.page.height).strokeColor('black').lineWidth(2).stroke();

  // Add some padding before the footer details

  // Add footer details at the bottom of the same page in a single inline row
  const footerText = [
    'Company Name: Happy Tails',
    'Contact Number: +123-456-7890',
    'Email: happytails@gmail.com'
  ];

  const footerHeight = 80; // Adjust this value as needed
  doc.y = doc.page.height - footerHeight;
  doc.fontSize(12);

  doc.rect(0, doc.y, doc.page.width, footerHeight).fillColor('#add8e6', 0.9).strokeColor('black').lineWidth(1).fillAndStroke().moveDown(1);

  // Display footer text in a single inline row with a small gap
  doc.fillColor('black');
  doc.fontSize(12);

  const text = footerText.join('    '); // Add four spaces as a gap between each part
  doc.text(text, { align: 'center' });

  // End the document
  doc.end();
}
export function buildPDF1(res, po_id, order_email, placed_date, placed_time, handover_date, payment, payment_method, collecting_method, shipping_address, shipping_number, item) {
  const doc = new PDFDocument({ margin: 50, size: 'letter', layout: 'landscape' });

  // Pipe the PDF data directly to the response object
  doc.pipe(res);

  // Set the text color to black
  doc.fillColor('black');

  // Set the title
  doc.fontSize(24)
    .text('Happy Tails PetCare Pvt Ltd', { align: 'center' })
    .moveDown(0.5);

  doc.fontSize(14)
    .text(`Your ${item} Receipt`, { align: 'center' })
    .moveDown(2);

  // Create two columns for the main content
  const column1 = doc.x;
  const column2 = doc.x + doc.page.width / 2;
  const columnWidth = doc.page.width / 2;

  // Display client information in two columns
  doc.text(`Order Email: ${order_email}`, column1)
    .text(`Order ID: ${po_id}`, column2)
    .moveDown(0.5);

  doc.text(`Placed Date: ${placed_date}`, column1)
    .text(`Placed Time: ${placed_time}`, column2)
    .moveDown(0.5);

  doc.text(`Handover Date: ${handover_date}`, column1)
    .text(`Payment: ${payment}`, column2)
    .moveDown(0.5);

  doc.text(`Payment Method: ${payment_method}`, column1)
    .text(`Collecting Method: ${collecting_method}`, column2)
    .moveDown(0.5);

  doc.text(`Shipping Address: ${shipping_address}`, column1)
    .text(`Shipping Number: ${shipping_number}`, column2)
    .moveDown(2);

  // Display the price
  doc.fillColor('red');
  doc.fontSize(16)
    .text('Thank You for Choosing Happy Tails PetCare CareCenter', column1)
    .moveDown(0.5);
  doc.fontSize(16)
    .text('Come Again!!!', column1)
    .fillColor('black')
    .moveDown(0.5);

  // Add a border around the content
  doc.rect(0, 0, doc.page.width, doc.page.height).strokeColor('black').lineWidth(2).stroke();

  // Add some padding before the footer details

  // Add footer details at the bottom of the same page in a single inline row
  const footerText = [
    'Company Name: Happy Tails',
    'Contact Number: +123-456-7890',
    'Email: happytails@gmail.com'
  ];

  const footerHeight = 80; // Adjust this value as needed
  doc.y = doc.page.height - footerHeight;
  doc.fontSize(12);

  doc.rect(0, doc.y, doc.page.width, footerHeight).fillColor('#add8e6', 0.9).strokeColor('black').lineWidth(1).fillAndStroke().moveDown(1);

  // Display footer text in a single inline row with a small gap
  doc.fillColor('black');
  doc.fontSize(12);

  const text = footerText.join('    '); // Add four spaces as a gap between each part
  doc.text(text, { align: 'center' });

  // End the document
  doc.end();
}
export function buildPDF2(res,
  request_id,
  client_id,
  pet_id,
  package_name,
  board_arrival_date,
  board_carry_date,
  price,
  item) {
  const doc = new PDFDocument({ margin: 50, size: 'letter', layout: 'landscape' });

  // Pipe the PDF data directly to the response object
  doc.pipe(res);

  // Set the text color to black
  doc.fillColor('black');

  // Set the title
  doc.fontSize(24)
    .text('Happy Tails PetCare Pvt Ltd', { align: 'center' })
    .moveDown(0.5);

  doc.fontSize(18)
    .text(`Your ${item} Receipt`, { align: 'center' })
    .moveDown(2);
  doc.text(`Request ID: ${request_id}`)
    .moveDown(0.5);
  // Display client information
  doc.text(`Client ID: ${client_id}`)
    .moveDown(0.5);
  doc.text(`Pet ID: ${pet_id}`)
    .moveDown(0.5);
  doc.text(`Board Arrival Date: ${board_arrival_date}`)
    .moveDown(0.5);
  doc.text(`Board Carry Date: ${board_carry_date}`)
    .moveDown(0.5);
  doc.text(`Package Name: ${package_name}`)
    .moveDown(0.5);

  // Display the price
  doc.fontSize(16)
    .text(`Total Price: ${price}`)
    .moveDown(3);

  doc.fillColor('red')
  doc.fontSize(16)
    .text('Thank You for Choosing Happy Tails PetCare CareCenter', { align: 'center' })
    .moveDown(0.5);
  doc.fontSize(16)
    .text('Come Again!!!', { align: 'center' })
    .fillColor('red')
    .moveDown(0.5);

  // Add a border around the content
  doc.rect(0, 0, doc.page.width, doc.page.height).strokeColor('black').lineWidth(2).stroke();

  // Add some padding before the footer details

  // Add footer details at the bottom of the same page in a single inline row
  const footerText = [
    'Company Name: Happy Tails',
    'Contact Number: +123-456-7890',
    'Email: happytails@gmail.com'
  ];

  const footerHeight = 80; // Adjust this value as needed
  doc.y = doc.page.height - footerHeight;
  doc.fontSize(12);

  doc.rect(0, doc.y, doc.page.width, footerHeight).fillColor('#add8e6', 0.9).strokeColor('black').lineWidth(1).fillAndStroke().moveDown(1);

  // Display footer text in a single inline row with a small gap
  doc.fillColor('black');
  doc.fontSize(12);

  const text = footerText.join('    '); // Add four spaces as a gap between each part
  doc.text(text, { align: 'center' });

  // End the document
  doc.end();
}
export function buildPDF3(res,
  appointment_id,
  client_email,
  placed_date,
  first_name,
  last_name,
  pet_id,
  payment,
  item) {
  const doc = new PDFDocument({ margin: 50, size: 'letter', layout: 'landscape' });

  // Pipe the PDF data directly to the response object
  doc.pipe(res);

  // Set the text color to black
  doc.fillColor('black');

  // Set the title
  doc.fontSize(24)
    .text('Happy Tails PetCare Pvt Ltd', { align: 'center' })
    .moveDown(0.5);

  doc.fontSize(18)
    .text(`Your ${item} Receipt`, { align: 'center' })
    .moveDown(2);
  doc.text(`Appointment ID: ${appointment_id}`)
    .moveDown(0.5);
  // Display client information
  doc.text(`Client Email: ${client_email}`)
    .moveDown(0.5);
  doc.text(`Pet ID: ${pet_id}`)
    .moveDown(0.5);
  doc.text(`Placed Date: ${placed_date}`)
    .moveDown(0.5);
  doc.text(`Vet :Dr. ${first_name} ${last_name}`)
    .moveDown(0.5);
  doc.text(`Payment: ${payment}`)
    .moveDown(2);

  // Display the price
  
  doc.fillColor('red')
  doc.fontSize(16)
    .text('Thank You for Choosing Happy Tails PetCare CareCenter', { align: 'center' })
    .moveDown(0.5);
  doc.fontSize(16)
    .text('Come Again!!!', { align: 'center' })
    .fillColor('red')
    .moveDown(0.5);

  // Add a border around the content
  doc.rect(0, 0, doc.page.width, doc.page.height).strokeColor('black').lineWidth(2).stroke();

  // Add some padding before the footer details

  // Add footer details at the bottom of the same page in a single inline row
  const footerText = [
    'Company Name: Happy Tails',
    'Contact Number: +123-456-7890',
    'Email: happytails@gmail.com'
  ];

  const footerHeight = 80; // Adjust this value as needed
  doc.y = doc.page.height - footerHeight;
  doc.fontSize(12);

  doc.rect(0, doc.y, doc.page.width, footerHeight).fillColor('#add8e6', 0.9).strokeColor('black').lineWidth(1).fillAndStroke().moveDown(1);

  // Display footer text in a single inline row with a small gap
  doc.fillColor('black');
  doc.fontSize(12);

  const text = footerText.join('    '); // Add four spaces as a gap between each part
  doc.text(text, { align: 'center' });

  // End the document
  doc.end();
}
